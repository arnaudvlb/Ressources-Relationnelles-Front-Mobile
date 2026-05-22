import { StyleSheet } from "react-native";

export function makeHomeConnectedStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      padding: 24,
      paddingBottom: 40,
    },

    header: {
      marginTop: 10,
      marginBottom: 24,
    },

    hello: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.muted,
      marginBottom: 8,
    },

    title: {
      fontSize: 30,
      lineHeight: 37,
      fontWeight: "800",
      color: colors.text,
    },

    subtitle: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    mainCard: {
      width: "100%",
      borderRadius: 26,
      padding: 24,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    cardLabel: {
      fontSize: 13,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      color: colors.primary ?? colors.tint,
      marginBottom: 10,
    },

    cardTitle: {
      fontSize: 23,
      lineHeight: 29,
      fontWeight: "800",
      color: colors.text,
    },

    cardText: {
      marginTop: 12,
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    primaryButton: {
      marginTop: 22,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary ?? colors.tint,
    },

    primaryButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.buttonText ?? "#FFFFFF",
    },

    buttonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },

    section: {
      marginTop: 28,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 14,
    },

    quickActions: {
      gap: 14,
    },

    quickCard: {
      borderRadius: 20,
      padding: 18,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    quickCardPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },

    quickTitle: {
      fontSize: 17,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 6,
    },

    quickText: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.muted,
    },

    quoteCard: {
      marginTop: 28,
      borderRadius: 20,
      padding: 18,
      backgroundColor: colors.primarySoft ?? "rgba(255,255,255,0.06)",
    },

    quoteText: {
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "600",
      color: colors.text,
      textAlign: "center",
    },
  });
}