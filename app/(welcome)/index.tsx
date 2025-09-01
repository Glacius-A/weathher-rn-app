import { StyleSheet, Alert } from "react-native";

import { View } from "@/components/Themed";
import { Button } from "@/components/common/Button";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as Location from "expo-location";

export default function WelcomeScreen() {
  const router = useRouter();

  const onLogin = () => {
    router.navigate("/(auth)/login");
  };
  const onSignup = () => {
    router.navigate("/(auth)/signup");
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={onLogin} text="Login" />
      <Button onPress={onSignup} text="SignUp" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
