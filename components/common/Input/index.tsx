import { forwardRef } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

// export insterface InputI {}

export const Input = forwardRef<TextInput, TextInputProps>(
  (props: TextInputProps, ref) => {
    return <TextInput ref={ref} {...props} style={styles.input} />;
  }
);

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    color: "#fff",
  },
});
