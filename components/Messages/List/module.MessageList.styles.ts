import { StyleSheet } from "react-native";

export function makeMessagerieStyles(colors: any) {
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

    conversationCard: {
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

    cardPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },

    avatar: {
      width: 56,
      height: 56,
      borderRadius: 18,
    },

    avatarPlaceholder: {
      width: 56,
      height: 56,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primarySoft ?? "rgba(255,255,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatarText: {
      fontSize: 23,
      fontWeight: "900",
      color: colors.text,
    },

    conversationContent: {
      flex: 1,
    },

    conversationTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },

    pseudo: {
      flex: 1,
      fontSize: 16,
      fontWeight: "900",
      color: colors.text,
    },

    date: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.muted,
    },

    name: {
      marginTop: 3,
      fontSize: 13,
      color: colors.muted,
    },

    lastMessage: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
      opacity: 0.85,
    },
  });
}