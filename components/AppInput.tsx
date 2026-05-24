import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "phone-pad"
    | "numeric"
    | "number-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  multiline = false,
  inputStyle,
  wrapperStyle,
}: Readonly<Props>) {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];

  const styles = makeInputStyles(colors);

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[styles.input, multiline && styles.multilineInput, inputStyle]}
      />
    </View>
  );
}

function makeInputStyles(colors: any) {
  return StyleSheet.create({
    wrapper: {
      gap: 8,
    },

    label: {
      color: colors.muted,
      fontWeight: "700",
    },

    input: {
      backgroundColor: colors.card,
      borderRadius: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      fontSize: 16,
    },

    multilineInput: {
      minHeight: 46,
      maxHeight: 110,
    },
  });
}