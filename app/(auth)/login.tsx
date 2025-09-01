import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Button } from "@/components/common/Button";
import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "@/firebaseConfig";
import { Input } from "@/components/common/Input";
import { saveToken } from "@/storage/auth";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef(null);
  const passwordRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    signInWithEmailAndPassword(authentication, email, password)
      .then(async (res) => {
        const token = await res.user.getIdToken();
        if (token) {
          await saveToken(token);
          router.navigate("/(tabs)/one");
        } else {
          throw new Error("Something went wrong!");
        }
      })

      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
  };

  const fillCreds = () => {
    setEmail("test@test.com");
    setPassword("test123");
  };

  return (
    <View style={styles.container}>
      <Text>LoginScreen test@test.com / test123 </Text>

      <Input
        ref={inputRef}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <Input
        ref={passwordRef}
        placeholder="Enter your password"
        placeholderTextColor="#003f5c"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button onPress={handleSignIn} loading={isLoading} text={"login"} />
      <Button onPress={fillCreds} loading={isLoading} text={"fillCreds"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 16,
  },
  errorText: { color: "red" },
});
