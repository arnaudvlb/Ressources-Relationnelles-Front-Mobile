import { StyleSheet } from "react-native";

export function makeConversationStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    keyboardContainer: {
      flex: 1,
    },

    content: {
      padding: 24,
      paddingBottom: 40,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 18,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border ?? "rgba(255,255,255,0.12)",
      backgroundColor: colors.background,
    },

    backButton: {
      width: 38,
      height: 38,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card ?? "rgba(255,255,255,0.06)",
    },

    backText: {
      fontSize: 24,
      fontWeight: "900",
      color: colors.text,
    },

    avatar: {
      width: 46,
      height: 46,
      borderRadius: 16,
    },

    avatarPlaceholder: {
      width: 46,
      height: 46,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primarySoft ?? "rgba(255,255,255,0.08)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    avatarText: {
      fontSize: 20,
      fontWeight: "900",
      color: colors.text,
    },

    headerInfo: {
      flex: 1,
    },

    title: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "900",
      color: colors.text,
    },

    pseudo: {
      fontSize: 16,
      fontWeight: "900",
      color: colors.text,
    },

    name: {
      marginTop: 2,
      fontSize: 13,
      color: colors.muted,
    },

    muted: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    messagesContent: {
      padding: 18,
      paddingBottom: 24,
      flexGrow: 1,
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

    messageRow: {
      width: "100%",
      marginBottom: 12,
    },

    myMessageRow: {
      alignItems: "flex-end",
    },

    otherMessageRow: {
      alignItems: "flex-start",
    },

    messageBubble: {
      maxWidth: "78%",
      borderRadius: 18,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderWidth: 1,
    },

    myMessageBubble: {
      backgroundColor: colors.primary ?? colors.tint,
      borderColor: colors.primary ?? colors.tint,
      borderTopRightRadius: 6,
    },

    otherMessageBubble: {
      backgroundColor: colors.card ?? "rgba(255,255,255,0.06)",
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
      borderTopLeftRadius: 6,
    },

    messageText: {
      fontSize: 15,
      lineHeight: 21,
      color: colors.text,
    },

    messageDate: {
      marginTop: 6,
      fontSize: 11,
      color: colors.muted,
      textAlign: "right",
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 10,
      padding: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border ?? "rgba(255,255,255,0.12)",
      backgroundColor: colors.background,
    },

    input: {
      flex: 1,
      minHeight: 46,
      maxHeight: 110,
      borderRadius: 16,
      paddingHorizontal: 14,
      paddingVertical: 11,
      fontSize: 15,
      color: colors.text,
      backgroundColor: colors.card ?? "rgba(255,255,255,0.06)",
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    sendButton: {
      minHeight: 46,
      paddingHorizontal: 16,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary ?? colors.tint,
    },

    sendButtonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },

    sendButtonDisabled: {
      opacity: 0.5,
    },

    sendButtonText: {
      fontSize: 14,
      fontWeight: "900",
      color: colors.buttonText ?? "#FFFFFF",
    },
  });
}