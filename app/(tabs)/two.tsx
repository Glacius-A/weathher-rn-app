import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";

import { Text, View } from "@/components/Themed";
import { Picker } from "@react-native-picker/picker";
import { coorsType } from "@/types/common";
import { getWeather } from "@/api/weather";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { WeatherWidget } from "@/components/weatherWidget";
import { setOtherWeather } from "@/reducers/weatherOtherSlice";

const LVIV_COORS = { lat: 49.8397, lng: 24.0297 };
const KIEV_COORS = { lat: 50.4501, lng: 30.5234 };
const KHHARKIV_COORS = { lat: 49.9935, lng: 36.2304 };

export default function TabTwoScreen() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("lviv");
  const [coordinates, setCoordinates] = useState<coorsType | null>(null);

  const dispatch = useAppDispatch();
  const { daily, daily_units } = useAppSelector((state) => state.weatherOther);

  const handleValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
    switch (itemValue) {
      case "lviv":
        setCoordinates(LVIV_COORS);
        getData(LVIV_COORS);
        break;
      case "kiev":
        setCoordinates(KIEV_COORS);
        getData(KIEV_COORS);
        break;
      case "kharkiv":
        setCoordinates(KHHARKIV_COORS);
        getData(KHHARKIV_COORS);
        break;
    }
  };

  const getData = async (coors: coorsType) => {
    setLoading(true);
    try {
      const res = await getWeather(coors);
      setLoaded(true);
      dispatch(setOtherWeather(res));
      return res;
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={styles.picker}
      >
        <Picker.Item label="Lviv" value="lviv" />
        <Picker.Item label="Kiev" value="kiev" />
        <Picker.Item label="Kharkiv" value="kharkiv" />
      </Picker>
      <View>
        {coordinates && (
          <Text style={styles.coordinates}>
            Coordinates: {coordinates.lat}, {coordinates.lng}
          </Text>
        )}
      </View>
      {loading && loaded ? (
        <ActivityIndicator />
      ) : (
        <WeatherWidget daily={daily} daily_units={daily_units} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "white",
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
  picker: {
    width: 200,
    marginTop: 20,
  },
  coordinates: {
    marginTop: 20,
    fontSize: 16,
  },
});
