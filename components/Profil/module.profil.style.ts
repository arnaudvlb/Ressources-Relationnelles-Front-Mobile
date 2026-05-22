import { StyleSheet } from "react-native";

export function makeProfileStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      padding: 24,
      paddingBottom: 40,
    },

    title: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "900",
      color: colors.text,
      marginBottom: 22,
    },

    card: {
      width: "100%",
      borderRadius: 26,
      padding: 24,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatar: {
      width: 96,
      height: 96,
      borderRadius: 24,
      alignSelf: "center",
      marginBottom: 16,
    },

    avatarPlaceholder: {
      width: 96,
      height: 96,
      borderRadius: 24,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: colors.primarySoft ?? "rgba(255,255,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatarText: {
      fontSize: 34,
      fontWeight: "900",
      color: colors.text,
    },

    profileName: {
      fontSize: 22,
      fontWeight: "900",
      color: colors.text,
      textAlign: "center",
    },

    profileSubtitle: {
      marginTop: 6,
      marginBottom: 24,
      fontSize: 14,
      lineHeight: 20,
      color: colors.muted,
      textAlign: "center",
    },

    infoGroup: {
      marginBottom: 16,
    },

    fieldGroup: {
      marginBottom: 16,
    },

    label: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.muted,
      marginBottom: 6,
    },

    value: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "800",
      color: colors.text,
    },

    input: {
      minHeight: 48,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      backgroundColor: colors.input ?? "rgba(255,255,255,0.06)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    buttonRow: {
      gap: 12,
      marginTop: 8,
    },

    primaryButton: {
      marginTop: 14,
      paddingVertical: 15,
      paddingHorizontal: 18,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary ?? colors.tint,
    },

    primaryButtonText: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.buttonText ?? "#FFFFFF",
    },

    secondaryButton: {
      marginTop: 14,
      paddingVertical: 15,
      paddingHorizontal: 18,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    secondaryButtonText: {
      fontSize: 15,
      fontWeight: "800",
      color: colors.text,
    },

    logoutButton: {
      marginTop: 22,
      paddingVertical: 15,
      paddingHorizontal: 18,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 80, 80, 0.12)",
      borderWidth: 1,
      borderColor: "rgba(255, 80, 80, 0.35)",
    },

    logoutText: {
      fontSize: 15,
      fontWeight: "900",
      color: "#ff6b6b",
    },

    muted: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },
  });
}