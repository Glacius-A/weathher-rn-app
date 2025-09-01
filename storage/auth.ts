import * as SecureStore from "expo-secure-store";

export async function saveToken(value: string) {
  await SecureStore.setItemAsync("token", value);
}

export async function getToken() {
  const result = await SecureStore.getItemAsync("token");
  return result;
}
