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

    card: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: colors.card ?? colors.background,
      borderRadius: 28,
      padding: 26,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    logo: {
      width: 120,
      height: 120,
      marginBottom: 22,
    },

    title: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "800",
      color: colors.text,
      textAlign: "center",
    },

    slogan: {
      marginTop: 14,
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
    },

    description: {
      marginTop: 14,
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
      textAlign: "center",
    },

    button: {
      marginTop: 28,
      width: "100%",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary ?? colors.tint,
    },

    buttonPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },

    buttonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.buttonText ?? "#FFFFFF",
    },
  });
}