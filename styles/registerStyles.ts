import { StyleSheet } from "react-native";

export function makeRegisterStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    scrollContent: {
      padding: 24,
      paddingBottom: 36,
      gap: 16,
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

    sectionTitle: {
      color: colors.text,
      fontWeight: "800",
      fontSize: 16,
      marginBottom: 4,
    },

    buttonPrimary: {
      marginTop: 6,
      backgroundColor: colors.accent,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
    },

    buttonPrimaryText: {
      color: "#08131F",
      fontWeight: "900",
      fontSize: 16,
    },

    link: {
      textAlign: "center",
      fontWeight: "800",
      color: colors.primary,
      paddingVertical: 8,
    },
  });
}
