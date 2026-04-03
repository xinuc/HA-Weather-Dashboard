import { WeatherCondition } from './types';
import { SkyGradient, RGB } from './sky-color';

// ── Types ──────────────────────────────────────────────────────────────────

export interface SkyHistoryEntry {
  timestamp: number;           // Unix ms
  condition: WeatherCondition;
  skyGradient: SkyGradient;    // frozen RGB values at capture time
  temperature?: number;
  showStars: boolean;
  showMoon: boolean;
  moonPhase?: string;
}

export interface SkyHistoryState {
  condition: WeatherCondition;
  skyGradient: SkyGradient;
  temperature?: number;
  showStars: boolean;
  showMoon: boolean;
  moonPhase?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const MIN_INTERVAL_MS = 5 * 60 * 1000;    // 5 minutes between entries
const MERGE_WINDOW_MS = 10 * 60 * 1000;   // merge if same condition returns within 10 min
const GRADIENT_THRESHOLD = 30;             // avg RGB distance for significant shift

// ── Helpers ────────────────────────────────────────────────────────────────

function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2,
  );
}

function cloneGradient(g: SkyGradient): SkyGradient {
  return {
    zenith: [...g.zenith] as RGB,
    mid: [...g.mid] as RGB,
    horizon: [...g.horizon] as RGB,
  };
}

function startOfDay(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

// ── Store ──────────────────────────────────────────────────────────────────

export class SkyHistoryStore {
  private _entries: SkyHistoryEntry[] = [];
  private _lastCondition: WeatherCondition | null = null;
  private _lastEntryTime = 0;
  private _dayStart = startOfDay();

  /** Record current state. Returns true if a new entry was added. */
  record(state: SkyHistoryState): boolean {
    const now = Date.now();

    // Midnight reset
    const today = startOfDay();
    if (today !== this._dayStart) {
      this.clear();
      this._dayStart = today;
    }

    // Initial entry — timeline should never be empty
    if (this._entries.length === 0) {
      this._addEntry(state, now);
      return true;
    }

    // Minimum interval between entries
    if (now - this._lastEntryTime < MIN_INTERVAL_MS) {
      return false;
    }

    // Condition changed?
    if (state.condition !== this._lastCondition) {
      // Dedup: if same condition returned within merge window, skip
      if (this._shouldMerge(state.condition, now)) {
        return false;
      }
      this._addEntry(state, now);
      return true;
    }

    // No condition change — check for significant gradient shift
    // (captures sunrise/sunset color progression)
    if (this._isSignificantGradientShift(state.skyGradient)) {
      this._addEntry(state, now);
      return true;
    }

    return false;
  }

  /** Get all entries for today. */
  get entries(): readonly SkyHistoryEntry[] {
    return this._entries;
  }

  /** Clear history. */
  clear(): void {
    this._entries = [];
    this._lastCondition = null;
    this._lastEntryTime = 0;
  }

  // ── Private ────────────────────────────────────────────────────────────

  private _addEntry(state: SkyHistoryState, timestamp: number): void {
    this._entries.push({
      timestamp,
      condition: state.condition,
      skyGradient: cloneGradient(state.skyGradient),
      temperature: state.temperature,
      showStars: state.showStars,
      showMoon: state.showMoon,
      moonPhase: state.moonPhase,
    });
    this._lastCondition = state.condition;
    this._lastEntryTime = timestamp;
  }

  /**
   * Check if a returning condition should be merged (suppressed).
   * If the same condition appeared recently, it's likely flapping.
   */
  private _shouldMerge(condition: WeatherCondition, now: number): boolean {
    // Look backwards for the last entry with this condition
    for (let i = this._entries.length - 1; i >= 0; i--) {
      const e = this._entries[i];
      if (e.condition === condition) {
        return (now - e.timestamp) < MERGE_WINDOW_MS;
      }
      // Only check recent entries
      if (now - e.timestamp > MERGE_WINDOW_MS) break;
    }
    return false;
  }

  /**
   * Detect significant color shift across all 3 gradient stops.
   * Triggers during sunrise/sunset when colors change dramatically.
   */
  private _isSignificantGradientShift(gradient: SkyGradient): boolean {
    if (this._entries.length === 0) return false;
    const last = this._entries[this._entries.length - 1].skyGradient;

    const dZ = colorDistance(last.zenith, gradient.zenith);
    const dM = colorDistance(last.mid, gradient.mid);
    const dH = colorDistance(last.horizon, gradient.horizon);
    const avgDelta = (dZ + dM + dH) / 3;

    return avgDelta > GRADIENT_THRESHOLD;
  }
}
