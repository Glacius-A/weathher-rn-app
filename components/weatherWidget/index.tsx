import { WeatherType } from "@/types/weather";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeatherWidgetI {
  daily: WeatherType["daily"];
  daily_units: WeatherType["daily_units"];
}

export const WeatherWidget = ({ daily, daily_units }: WeatherWidgetI) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Temperature:{" "}
        <Text>
          {daily.temperature_2m_mean} {daily_units.temperature_2m_mean}
        </Text>
      </Text>
      <Text style={styles.title}>
        Wind speed:{" "}
        <Text>
          {daily.wind_speed_10m_max} {daily_units.wind_speed_10m_max}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
