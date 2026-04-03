import { clearSkyRadiation } from './condition-engine';

// ── Types ──────────────────────────────────────────────────────────────────

export type RGB = [number, number, number];

export interface SkyGradient {
  zenith: RGB;
  mid: RGB;
  horizon: RGB;
}

export type CloudState =
  | 'clear'
  | 'thin-ice-veil'
  | 'thin-haze'
  | 'moderate-ice'
  | 'moderate-overcast'
  | 'thick-overcast'
  | 'deep-overcast'
  | 'storm';

export interface SkyInputs {
  sunElevation: number;       // degrees
  solarRadiation?: number;    // W/m² measured
  uvIndex?: number;           // measured
  humidity?: number;          // 0-100%
  rainRate?: number;          // mm/h
  moonIllumination?: number;  // 0-1
  isNight: boolean;
}

// ── Sky Anchor Table ───────────────────────────────────────────────────────
// Sun elevation → base zenith/horizon colors at clear sky, turbidity T≈3.
// Informed by Preetham (1999) zenith chromaticity curves, tuned for visual
// appeal on dark dashboard backgrounds and tropical atmosphere.

interface SkyAnchor {
  elevation: number;
  zenith: RGB;
  mid: RGB;       // mid-band color (~40-60% height) — key for sunrise/sunset warmth
  horizon: RGB;
}

const SKY_ANCHORS: SkyAnchor[] = [
  //                                zenith               mid (40-60%)            horizon
  { elevation: -18, zenith: [10, 10, 30],   mid: [12, 12, 35],    horizon: [15, 15, 40] },      // deep night
  { elevation: -12, zenith: [15, 20, 55],   mid: [20, 22, 58],    horizon: [25, 25, 60] },      // astronomical twilight
  { elevation:  -6, zenith: [25, 40, 90],   mid: [50, 45, 85],    horizon: [60, 50, 80] },      // nautical twilight
  { elevation:  -1, zenith: [40, 60, 120],  mid: [140, 80, 90],   horizon: [180, 100, 60] },    // civil twilight — pink/rose mid
  { elevation:   0, zenith: [60, 90, 160],  mid: [200, 120, 70],  horizon: [220, 130, 60] },    // sunrise/sunset — orange mid
  { elevation:   5, zenith: [80, 130, 200], mid: [170, 155, 130], horizon: [200, 170, 120] },   // golden hour — warm mid
  { elevation:  10, zenith: [90, 150, 220], mid: [140, 170, 210], horizon: [170, 190, 200] },   // low sun — slight warm
  { elevation:  20, zenith: [70, 140, 220], mid: [110, 165, 220], horizon: [140, 180, 220] },   // morning/afternoon — blue
  { elevation:  45, zenith: [50, 120, 210], mid: [85, 145, 215],  horizon: [120, 170, 220] },   // midday — blue
  { elevation:  90, zenith: [40, 100, 200], mid: [75, 130, 208],  horizon: [110, 160, 215] },   // high noon — blue
];

// ── Cloud Color Targets ────────────────────────────────────────────────────
// Each cloud state has distinct day/night color targets based on optical
// properties: ice clouds → milky white-blue, water clouds → flat gray,
// storm → dark slate.

interface CloudTarget {
  day: RGB;
  night: RGB;
}

const CLOUD_TARGETS: Record<CloudState, CloudTarget | null> = {
  'clear':             null,  // no modification
  'thin-ice-veil':     { day: [200, 215, 235], night: [25, 30, 55] },
  'thin-haze':         { day: [185, 200, 220], night: [30, 35, 50] },
  'moderate-ice':      { day: [170, 185, 210], night: [30, 35, 55] },
  'moderate-overcast': { day: [145, 160, 180], night: [35, 40, 55] },
  'thick-overcast':    { day: [120, 125, 135], night: [35, 38, 48] },
  'deep-overcast':     { day: [90, 95, 105],   night: [30, 33, 40] },
  'storm':             { day: [55, 60, 70],     night: [25, 28, 35] },
};

// ── Kt ranges for each cloud state ────────────────────────────────────────
// Used to calculate interpolation weight within each cloud state band.
const CLOUD_KT_RANGES: Record<CloudState, [number, number]> = {
  'clear':             [0.90, 1.0],
  'thin-ice-veil':     [0.75, 0.90],
  'thin-haze':         [0.75, 0.90],
  'moderate-ice':      [0.50, 0.75],
  'moderate-overcast': [0.50, 0.75],
  'thick-overcast':    [0.25, 0.50],
  'deep-overcast':     [0.10, 0.25],
  'storm':             [0.00, 0.10],
};

// ── Core Math ──────────────────────────────────────────────────────────────

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  const tc = Math.max(0, Math.min(1, t));
  return [
    Math.round(a[0] + (b[0] - a[0]) * tc),
    Math.round(a[1] + (b[1] - a[1]) * tc),
    Math.round(a[2] + (b[2] - a[2]) * tc),
  ];
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ── Step 1: Base Sky Gradient from Sun Elevation ───────────────────────────

function getBaseGradient(sunElevation: number): SkyGradient {
  const e = clamp(sunElevation, -18, 90);

  // Find bracketing anchors
  let lower = SKY_ANCHORS[0];
  let upper = SKY_ANCHORS[SKY_ANCHORS.length - 1];

  for (let i = 0; i < SKY_ANCHORS.length - 1; i++) {
    if (e >= SKY_ANCHORS[i].elevation && e <= SKY_ANCHORS[i + 1].elevation) {
      lower = SKY_ANCHORS[i];
      upper = SKY_ANCHORS[i + 1];
      break;
    }
  }

  const range = upper.elevation - lower.elevation;
  const t = range > 0 ? (e - lower.elevation) / range : 0;

  return {
    zenith: lerpRGB(lower.zenith, upper.zenith, t),
    mid: lerpRGB(lower.mid, upper.mid, t),
    horizon: lerpRGB(lower.horizon, upper.horizon, t),
  };
}

// ── Step 2: Cloud Characterization ─────────────────────────────────────────

/**
 * Compute clearness index: ratio of measured to theoretical clear-sky radiation.
 * This is a cloud transmittance measure, not a simple fraction.
 */
function computeKt(solarRadiation: number, sunElevation: number): number {
  if (sunElevation <= 0) return -1; // can't compute at night
  const expected = clearSkyRadiation(sunElevation);
  if (expected <= 20) return -1; // too low sun angle for reliable reading
  return clamp(solarRadiation / expected, 0, 1.2); // allow slight overshoot
}

/**
 * Estimate clear-sky UV index for a given sun elevation.
 * Simplified model for tropical atmosphere (~260 DU ozone column).
 * UV index ≈ 12.5 * sin(elevation) at clear sky.
 */
function clearSkyUV(sunElevation: number): number {
  if (sunElevation <= 0) return 0;
  const elevRad = sunElevation * Math.PI / 180;
  // Tropical clear-sky UV peaks around 12-14 at zenith
  return 12.5 * Math.sin(elevRad) * 0.85;
}

/**
 * Compute spectral ratio: UV cloud modification factor vs solar CMF.
 * Ratio ~1.0 = ice cloud or clear. Ratio >1.1 = water cloud.
 * Ice crystals attenuate UV and solar equally; water droplets let UV leak through.
 */
function computeSpectralRatio(
  uvIndex: number,
  solarKt: number,
  sunElevation: number,
): number {
  if (sunElevation <= 3 || solarKt <= 0) return 1.0; // can't distinguish
  const expectedUV = clearSkyUV(sunElevation);
  if (expectedUV <= 0.5) return 1.0; // too low for reliable ratio
  const uvCMF = clamp(uvIndex / expectedUV, 0, 1.5);
  // Avoid division by near-zero
  if (solarKt < 0.05) return uvCMF > 0.1 ? 1.3 : 1.0;
  return clamp(uvCMF / solarKt, 0.5, 2.0);
}

/**
 * Classify cloud state from Kt (transmittance) and spectral ratio (cloud type).
 * Returns one of 8 cloud states mapping to distinct visual appearances.
 */
function classifyCloud(
  Kt: number,
  spectralRatio: number,
  rainRate: number,
): CloudState {
  if (Kt < 0) return 'clear'; // night or insufficient data

  if (Kt > 0.90) return 'clear';

  if (Kt > 0.75) {
    return spectralRatio < 1.08 ? 'thin-ice-veil' : 'thin-haze';
  }

  if (Kt > 0.50) {
    return spectralRatio < 1.08 ? 'moderate-ice' : 'moderate-overcast';
  }

  if (Kt > 0.25) return 'thick-overcast';

  // Kt <= 0.25
  if (rainRate >= 0.1) return 'storm';
  return 'deep-overcast';
}

// ── Step 2d: Apply Cloud Color Modifier ────────────────────────────────────

function applyCloudModifier(
  gradient: SkyGradient,
  cloudState: CloudState,
  Kt: number,
  isNight: boolean,
): SkyGradient {
  const target = CLOUD_TARGETS[cloudState];
  if (!target) return gradient; // clear sky, no modification

  const color = isNight ? target.night : target.day;
  const [ktLow, ktHigh] = CLOUD_KT_RANGES[cloudState];
  const ktRange = ktHigh - ktLow;

  // Weight: 0 at top of range (barely entering this state), 1 at bottom
  const rawWeight = ktRange > 0 ? 1 - ((clamp(Kt, ktLow, ktHigh) - ktLow) / ktRange) : 0.5;
  // Cap at 0.75 to preserve some time-of-day color identity
  const weight = rawWeight * 0.75;

  return {
    zenith: lerpRGB(gradient.zenith, color, weight),
    mid: lerpRGB(gradient.mid, color, weight),
    horizon: lerpRGB(gradient.horizon, color, weight),
  };
}

// ── Step 3: Humidity / Turbidity Modifier ──────────────────────────────────

function applyHumidityModifier(
  gradient: SkyGradient,
  humidity: number,
  Kt: number,
): SkyGradient {
  // Only affects clear to moderate cloud (Kt > 0.50)
  // Under thick overcast, sky is already gray — humidity has no visual effect
  if (Kt >= 0 && Kt <= 0.50) return gradient;

  // turbidity T = 2 + humidity/20 → maps 0-100% to T 2-7
  // desaturation = (T - 2) / 8 → normalized 0 to ~0.625
  const turbidity = 2 + humidity / 20;
  const desaturation = (turbidity - 2) / 8;
  const weight = desaturation * 0.3; // subtle: max ~18% shift

  const paleTarget: RGB = [200, 210, 225];

  return {
    zenith: lerpRGB(gradient.zenith, paleTarget, weight),
    mid: lerpRGB(gradient.mid, paleTarget, weight * 1.1),
    horizon: lerpRGB(gradient.horizon, paleTarget, weight * 1.3), // horizon paler
  };
}

// ── Step 4: Rain Modifier ──────────────────────────────────────────────────

function applyRainModifier(gradient: SkyGradient, rainRate: number): SkyGradient {
  if (rainRate < 0.1) return gradient;

  // Darken proportional to rain intensity, capped at 40%
  const rainWeight = Math.min(rainRate / 20, 0.4);
  const darkSlate: RGB = [55, 60, 70];

  let result: SkyGradient = {
    zenith: lerpRGB(gradient.zenith, darkSlate, rainWeight),
    mid: lerpRGB(gradient.mid, darkSlate, rainWeight),
    horizon: lerpRGB(gradient.horizon, darkSlate, rainWeight),
  };

  // Heavy rain: additional storm darkening
  if (rainRate >= 10) {
    const stormTarget: RGB = [40, 42, 50];
    result = {
      zenith: lerpRGB(result.zenith, stormTarget, 0.2),
      mid: lerpRGB(result.mid, stormTarget, 0.2),
      horizon: lerpRGB(result.horizon, stormTarget, 0.2),
    };
  }

  return result;
}

// ── Step 5: Night Modifiers ────────────────────────────────────────────────

function applyNightModifiers(
  gradient: SkyGradient,
  moonIllumination: number,
  cloudState: CloudState,
): SkyGradient {
  // Moon brightening: full moon = +10% brightness
  if (moonIllumination > 0 && cloudState === 'clear') {
    const moonWeight = moonIllumination * 0.10;
    const moonlit: RGB = [20, 25, 65]; // blue-silver tint
    return {
      zenith: lerpRGB(gradient.zenith, moonlit, moonWeight),
      mid: lerpRGB(gradient.mid, moonlit, moonWeight * 0.7),
      horizon: lerpRGB(gradient.horizon, moonlit, moonWeight * 0.5),
    };
  }

  // Cloudy night: light pollution reflected off clouds → warm brownish-gray
  if (cloudState !== 'clear' && cloudState !== 'thin-ice-veil') {
    const lightPollution: RGB = [40, 38, 45];
    const pollutionWeight = 0.15;
    return {
      zenith: lerpRGB(gradient.zenith, lightPollution, pollutionWeight),
      mid: lerpRGB(gradient.mid, lightPollution, pollutionWeight),
      horizon: lerpRGB(gradient.horizon, lightPollution, pollutionWeight),
    };
  }

  return gradient;
}

// ── Humidity/Rain Fallback ──────────────────────────────────────────────────
// When solar radiation comparison is unreliable (low sun angle, no sensor),
// estimate cloud state from humidity and rain rate.

function estimateCloudFromHumidity(
  humidity: number | undefined,
  rainRate: number,
): CloudState {
  if (rainRate >= 10) return 'storm';
  if (rainRate >= 2.5) return 'deep-overcast';
  if (rainRate >= 0.1) return 'thick-overcast';
  if (humidity !== undefined) {
    if (humidity >= 95) return 'thick-overcast';
    if (humidity >= 90) return 'moderate-overcast';
    if (humidity >= 80) return 'thin-haze';
  }
  return 'clear';
}

// ── Night Cloud State Cache ────────────────────────────────────────────────
// Solar radiation reads zero at night, so we cache the last daytime cloud
// state for use after dark. Expires after 3 hours.

let _lastDayCloudState: CloudState = 'clear';
let _lastDayKt = 1.0;
let _lastDayTimestamp = 0;

const CACHE_EXPIRY_MS = 3 * 60 * 60 * 1000; // 3 hours

function updateDayCache(cloudState: CloudState, Kt: number): void {
  _lastDayCloudState = cloudState;
  _lastDayKt = Kt;
  _lastDayTimestamp = Date.now();
}

function getCachedNightCloud(): { cloudState: CloudState; Kt: number } {
  if (Date.now() - _lastDayTimestamp > CACHE_EXPIRY_MS) {
    // Cache expired — assume moderate cloud (safe default for tropics)
    return { cloudState: 'moderate-overcast', Kt: 0.6 };
  }
  return { cloudState: _lastDayCloudState, Kt: _lastDayKt };
}

// ── Main Entry Point ───────────────────────────────────────────────────────

/**
 * Compute dynamic sky gradient from sensor data.
 * Pipeline: elevation base → cloud characterization → humidity → rain → night.
 */
export function computeSkyGradient(inputs: SkyInputs): SkyGradient {
  const {
    sunElevation,
    solarRadiation,
    uvIndex,
    humidity,
    rainRate = 0,
    moonIllumination = 0,
    isNight,
  } = inputs;

  // Step 1: Base gradient from sun elevation
  let gradient = getBaseGradient(sunElevation);

  // Step 2: Cloud characterization
  let cloudState: CloudState = 'clear';
  let Kt = -1;

  if (!isNight && solarRadiation !== undefined) {
    Kt = computeKt(solarRadiation, sunElevation);

    if (Kt >= 0) {
      // Reliable solar comparison — use full cloud pipeline
      const spectralRatio = uvIndex !== undefined
        ? computeSpectralRatio(uvIndex, Kt, sunElevation)
        : 1.0;
      cloudState = classifyCloud(Kt, spectralRatio, rainRate);
      updateDayCache(cloudState, Kt);
    } else {
      // Low sun angle — solar comparison unreliable, use humidity/rain fallback
      cloudState = estimateCloudFromHumidity(humidity, rainRate);
      Kt = cloudState === 'clear' ? 0.9 : 0.4; // approximate for modifier weight
    }

    gradient = applyCloudModifier(gradient, cloudState, Kt, false);
  } else if (!isNight) {
    // Daytime but no solar radiation sensor — use humidity/rain
    cloudState = estimateCloudFromHumidity(humidity, rainRate);
    Kt = cloudState === 'clear' ? 0.9 : 0.4;
    gradient = applyCloudModifier(gradient, cloudState, Kt, false);
  } else {
    // Night — use cached daytime state
    const cached = getCachedNightCloud();
    cloudState = cached.cloudState;
    Kt = cached.Kt;

    // Rain overrides cached state at night
    if (rainRate >= 0.1) cloudState = 'storm';

    gradient = applyCloudModifier(gradient, cloudState, Kt, true);
  }

  // Step 3: Humidity / turbidity (only meaningful in daytime with some sky visible)
  if (humidity !== undefined) {
    gradient = applyHumidityModifier(gradient, humidity, Kt);
  }

  // Step 4: Rain darkening
  if (rainRate >= 0.1) {
    gradient = applyRainModifier(gradient, rainRate);
  }

  // Step 5: Night modifiers
  if (isNight) {
    gradient = applyNightModifiers(gradient, moonIllumination, cloudState);
  }

  return gradient;
}

/**
 * Convert SkyGradient to a CSS linear-gradient string.
 */
export function skyGradientCSS(gradient: SkyGradient): string {
  const z = `rgb(${gradient.zenith[0]},${gradient.zenith[1]},${gradient.zenith[2]})`;
  const m = `rgb(${gradient.mid[0]},${gradient.mid[1]},${gradient.mid[2]})`;
  const h = `rgb(${gradient.horizon[0]},${gradient.horizon[1]},${gradient.horizon[2]})`;
  return `linear-gradient(180deg, ${z} 0%, ${m} 55%, ${h} 100%)`;
}
