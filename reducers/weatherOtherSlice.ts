import { WeatherType } from "@/types/weather";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WeatherOtherState extends WeatherType {}

const initialState: WeatherOtherState = {
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

const weatherOtherSlice = createSlice({
  name: "weatherOther",
  initialState,
  reducers: {
    setOtherWeather: (state, action: PayloadAction<WeatherOtherState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setOtherWeather } = weatherOtherSlice.actions;
export default weatherOtherSlice.reducer;
