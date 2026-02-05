import { StyleSheet } from "react-native";

export function makeSimpleScreenStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      gap: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: colors.text,
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 21,
      color: colors.muted,
      textAlign: "center",
    },
  });
}