import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
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
};

export function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
}: Props) {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];

  const styles = makeInputStyles(colors);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
    </View>
  );
}

function makeInputStyles(colors: any) {
  return StyleSheet.create({
    wrapper: { gap: 8 },
    label: { color: colors.muted, fontWeight: "700" },
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
  });
}