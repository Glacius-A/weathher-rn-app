import { WeatherType } from "@/types/weather";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherCurrentState extends WeatherType {}

const initialState: WeatherCurrentState = {
  daily: {
    temperature_2m_mean: [],
    time: [],
    wind_speed_10m_max: [],
  },
  daily_units: {
    temperature_2m_mean: "",
    time: "",
    wind_speed_10m_max: "",
  },
  elevation: 0,
  generationtime_ms: 0,
  latitude: 0,
  longitude: 0,
  timezone: "",
  timezone_abbreviation: "",
  utc_offset_seconds: 0,
};

const weatherCurrentSlice = createSlice({
  name: "weatherCurrent",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherCurrentState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCurrentWeather } = weatherCurrentSlice.actions;
export default weatherCurrentSlice.reducer;
