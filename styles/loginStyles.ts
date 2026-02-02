import { StyleSheet } from "react-native";

export function makeLoginStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      padding: 24,
      gap: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 22,
      color: colors.muted,
    },
    card: {
      marginTop: 8,
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },
    button: {
      marginTop: 4,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.accent,
    },
    buttonText: {
      color: "#08131F",
      fontWeight: "900",
      fontSize: 16,
    },
    link: {
      textAlign: "center",
      fontWeight: "800",
      color: colors.primary,
    },
  });
}