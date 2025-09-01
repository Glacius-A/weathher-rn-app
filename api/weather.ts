import { GetWeatherType, WeatherType } from "@/types/weather";

export const getWeather = async ({
  lat,
  lng,
}: GetWeatherType): Promise<WeatherType> => {
  const dt = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_mean&daily=wind_speed_10m_max&start_date=${dt}&end_date=${dt}`,
    {
      method: "GET",
    }
  );

  return res.json();
};
