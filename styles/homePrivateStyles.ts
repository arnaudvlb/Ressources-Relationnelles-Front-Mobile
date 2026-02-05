import { StyleSheet } from "react-native";

export function makeHomePrivateStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      gap: 16,
    },

    title: {
      fontSize: 32,
      fontWeight: "800",
      color: colors.text,
    },

    subtitle: {
      fontSize: 15,
      lineHeight: 21,
      color: colors.muted,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },

    primaryButton: {
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.accent,
    },

    primaryButtonText: {
      color: "#08131F",
      fontWeight: "900",
      fontSize: 16,
    },

    secondaryButton: {
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },

    secondaryButtonText: {
      color: colors.text,
      fontWeight: "900",
      fontSize: 16,
    },
  });
}