# Weather Dashboard Card

A custom Home Assistant Lovelace card that displays a real-time animated weather dashboard with wind compass, speed gauge, AQI indicator, and 15 weather statistics.

Designed to work with [ha-wu-mqtt-bridge](https://github.com/xinuc/ha-wu-mqtt-bridge) but also compatible with any Home Assistant weather entity or individual sensor entities.

## Features

- Animated weather scene with sky gradients, condition icons, and twinkling stars at night
- Wind compass with rotating needle and 16-point direction labels
- Wind speed gauge with color-coded Beaufort scale bands
- Air Quality Index (AQI) badge with expressive face and mask for bad air
- Up to 15 live weather statistics with dynamic icons
- Responsive layout (mobile, tablet, desktop)
- Automatic sensor discovery for ha-wu-mqtt-bridge
- Units follow your Home Assistant system configuration (no manual unit setting)
- All icons bundled (Basmilius meteocons) - no external dependencies
- HACS compatible

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to **Frontend** > click the **three dots** menu > **Custom repositories**
3. Add the repository URL and select **Lovelace** as the category
4. Click **Add**, then find **Weather Dashboard Card** in the list
5. Click **Download**
6. Restart Home Assistant

### Manual

1. Download `weather-dashboard-card.js` from the [latest release](../../releases/latest)
2. Copy it to your `config/www/` directory
3. In Home Assistant, go to **Settings** > **Dashboards** > **three dots** menu > **Resources**
4. Click **Add Resource**:
   - URL: `/local/weather-dashboard-card.js`
   - Type: **JavaScript Module**
5. Restart Home Assistant

## Configuration

### Visual Editor

1. Edit your dashboard
2. Click **Add Card**
3. Search for **Weather Dashboard**
4. Fill in the configuration:
   - **WU Station ID** - Your Weather Underground station ID (if using the bridge)
   - **Or Weather Entity** - A `weather.*` entity (alternative to station ID)
   - **Air Quality Entity** - A PM2.5 sensor entity (optional)
   - **Card Title** - Custom title (default: "Weather Dashboard")
   - **Animations** - Enable/disable weather animations (default: on)
   - **Gauge Max Speed** - Maximum speed for the wind gauge in km/h (default: 50)

### YAML Configuration

#### Minimal (with ha-wu-mqtt-bridge)

```yaml
type: custom:weather-dashboard-card
device_id: MYSTATIONID
```

The card will auto-discover all sensor entities created by the bridge.

#### Minimal (with weather entity)

```yaml
type: custom:weather-dashboard-card
weather_entity: weather.home
```

#### Full example with manual sensors

```yaml
type: custom:weather-dashboard-card
weather_entity: weather.home
aqi_entity: sensor.aqi_pm25
title: My Weather Station
animations: true
gauge_max: 80
sensors:
  temperature: sensor.outdoor_temperature
  feels_like: sensor.outdoor_feels_like
  humidity: sensor.outdoor_humidity
  dew_point: sensor.outdoor_dew_point
  uv_index: sensor.uv_index
  wind_speed: sensor.wind_speed
  wind_gust: sensor.wind_gust
  wind_bearing: sensor.wind_direction
  rain_rate: sensor.rain_rate
  daily_rain: sensor.daily_rain
  pressure: sensor.barometric_pressure
  visibility: sensor.visibility
  solar_radiation: sensor.solar_radiation
  wind_chill: sensor.wind_chill
  heat_index: sensor.heat_index
  soil_temp: sensor.soil_temperature
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `device_id` | string | - | WU station ID for auto-discovery |
| `weather_entity` | string | - | HA weather entity (e.g. `weather.home`) |
| `aqi_entity` | string | - | PM2.5 sensor entity for AQI badge |
| `title` | string | `Weather Dashboard` | Card title |
| `animations` | boolean | `true` | Enable weather scene animations |
| `gauge_max` | number | `50` | Max speed on wind gauge (km/h) |
| `sensors` | object | - | Manual sensor entity overrides (see below) |

Either `device_id` or `weather_entity` is required.

### Sensor Roles

Use the `sensors` config to manually map entity IDs to specific roles. Any sensor not mapped will fall back to auto-discovery (if `device_id` is set) or weather entity attributes.

| Role | Description | Weather Entity Fallback |
|------|-------------|------------------------|
| `temperature` | Ambient temperature | Yes |
| `feels_like` | Apparent temperature | No |
| `humidity` | Relative humidity | Yes |
| `dew_point` | Dew point temperature | No |
| `uv_index` | UV index | No |
| `wind_speed` | Wind speed | Yes |
| `wind_gust` | Wind gust speed | No |
| `wind_bearing` | Wind direction (degrees) | Yes |
| `rain_rate` | Rain rate | No |
| `daily_rain` | Daily accumulated rain | No |
| `pressure` | Atmospheric pressure | Yes |
| `visibility` | Visibility distance | Yes |
| `solar_radiation` | Solar irradiance | No |
| `wind_chill` | Wind chill temperature | No |
| `heat_index` | Heat index temperature | No |
| `soil_temp` | Soil temperature | No |

Statistics without a data source are automatically hidden.

## Units

The card reads `unit_of_measurement` from each entity's attributes. Home Assistant automatically converts sensor values to your configured unit system when `device_class` is set on the entity. **No manual unit configuration is needed** - the card displays whatever units HA provides.

## AQI Levels

The AQI badge uses PM2.5 values to display air quality with color-coded faces:

| PM2.5 | Level | Color | Expression |
|-------|-------|-------|------------|
| 0 - 15 | Excellent | Blue | Happy grin |
| 15 - 30 | Good | Green | Smile |
| 30 - 50 | Moderate | Yellow | Neutral |
| 50 - 75 | Unhealthy | Orange | Slight frown |
| 75 - 100 | Very Bad | Red | Frown + angry brows |
| 100 - 200 | Hazardous | Purple | Angry brows + mask |
| 200+ | Toxic | Black | Angry brows + mask |

## Auto-Discovery

When `device_id` is set, the card searches for entities with the prefix `sensor.wu_{device_id}_` and automatically assigns them to the correct roles based on `device_class` and `friendly_name`. This works out-of-the-box with the [ha-wu-mqtt-bridge](https://github.com/xinuc/ha-wu-mqtt-bridge).

Manual `sensors` overrides always take precedence over auto-discovered entities.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Preview (requires Python 3)
# Open http://localhost:8091/preview/index.html
python3 -m http.server 8091
```

## License

MIT
