import { coorsType } from "./common";

export type GetWeatherType = coorsType & {};

export type WeatherType = {
  daily: {
    temperature_2m_mean: number[];
    time: string[];
    wind_speed_10m_max: number[];
  };
  daily_units: {
    temperature_2m_mean: string;
    time: string;
    wind_speed_10m_max: string;
  };
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
};
