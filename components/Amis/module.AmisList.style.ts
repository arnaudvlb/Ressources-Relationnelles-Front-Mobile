import { StyleSheet } from "react-native";

export function makeAmisStyles(colors: any) {
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
      marginBottom: 24,
    },

    title: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "900",
      color: colors.text,
    },

    subtitle: {
      marginTop: 10,
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    muted: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    emptyCard: {
      borderRadius: 22,
      padding: 22,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    emptyTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: colors.text,
      marginBottom: 8,
    },

    userCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      borderRadius: 22,
      padding: 16,
      marginBottom: 14,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatar: {
      width: 54,
      height: 54,
      borderRadius: 16,
    },

    avatarPlaceholder: {
      width: 54,
      height: 54,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primarySoft ?? "rgba(255,255,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatarText: {
      fontSize: 22,
      fontWeight: "900",
      color: colors.text,
    },

    userInfo: {
      flex: 1,
    },

    pseudo: {
      fontSize: 16,
      fontWeight: "900",
      color: colors.text,
    },

    name: {
      marginTop: 3,
      fontSize: 13,
      color: colors.muted,
    },

    addButton: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 14,
      backgroundColor: colors.primary ?? colors.tint,
    },

    addButtonText: {
      fontSize: 13,
      fontWeight: "800",
      color: colors.buttonText ?? "#FFFFFF",
    },

    buttonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },

    disabledButton: {
      opacity: 0.6,
    },
  });
}