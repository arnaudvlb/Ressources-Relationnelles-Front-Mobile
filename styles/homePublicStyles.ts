import { StyleSheet } from "react-native";

export function makeHomePublicStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
    },
    subtitle: {
      marginTop: 10,
      fontSize: 15,
      lineHeight: 21,
      color: colors.muted,
      textAlign: "center",
    },
  });
}