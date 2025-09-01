import { StyleSheet, Alert, ActivityIndicator } from "react-native";

import { Text, View } from "@/components/Themed";
import { Guard } from "@/components/guard";
import { getWeather } from "@/api/weather";
import { Suspense, useEffect, useState } from "react";
import { coorsType } from "@/types/common";
import * as Location from "expo-location";
import { setCurrentWeather } from "@/reducers/weatherCurrentSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { WeatherWidget } from "@/components/weatherWidget";

export default function TabOneScreen() {
  const [loading, setLoading] = useState(false);
  const { daily, daily_units } = useAppSelector(
    (state) => state.weatherCurrent
  );
  const dispatch = useAppDispatch();

  // const [location, setLocation] = useState<coorsType | null>(null);

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const coors: coorsType = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      return coors;
    } catch (error) {
      Alert.alert("Error", "Failed to get location. Please try again.");
      throw error;
    }
  };

  const getData = async (coors: coorsType) => {
    try {
      return await getWeather(coors);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data. Please try again.");
      throw error;
    }
  };

  const onMount = async () => {
    setLoading(true);
    try {
      const resLoc = await getLocation();
      const resData = await getData(resLoc);
      console.log(resData.daily);
      dispatch(setCurrentWeather(resData));
    } catch (error) {
      console.error("Error during initialization:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <Guard>
      {loading && <ActivityIndicator />}
      <View style={styles.container}>
        <WeatherWidget daily={daily} daily_units={daily_units} />
      </View>
    </Guard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
