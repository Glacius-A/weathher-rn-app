import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
export interface ButtonI {
  onPress: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({ onPress, text, loading, disabled }: ButtonI) => {
  const disbledStatus = loading || disabled;
  return (
    <TouchableOpacity
      style={[styles.button, disbledStatus && styles.disabled]}
      disabled={disbledStatus}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={{
            alignSelf: "center",
            justifyContent: "center",
          }}
        />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "gray",
  },
});
