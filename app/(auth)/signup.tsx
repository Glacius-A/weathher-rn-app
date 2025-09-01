import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Button } from "@/components/common/Button";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text>SignupScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
});
