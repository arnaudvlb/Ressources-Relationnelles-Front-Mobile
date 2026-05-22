import { StyleSheet } from "react-native";

export function makeRessourceDetailStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 18,
      gap: 12,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 10,
    },

    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      flex: 1,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 16,
    },

    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      alignItems: "center",
    },

    metaText: {
      color: colors.muted,
      fontSize: 13,
      fontWeight: "800",
    },

    badge: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: "900",
    },

    content: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 24,
    },

    actionsRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 4,
    },

    actionBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      borderRadius: 14,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },

    actionBtnActiveLike: {
      backgroundColor: "rgba(239, 68, 68, 0.15)",
      borderColor: "#ef4444",
    },

    actionBtnActiveFav: {
      backgroundColor: "rgba(234, 179, 8, 0.15)",
      borderColor: "#eab308",
    },

    actionText: {
      fontSize: 16,
      fontWeight: "900",
      color: colors.text,
    },

    actionTextActiveLike: {
      color: "#ef4444",
    },

    actionTextActiveFav: {
      color: "#eab308",
    },

    viewsText: {
      color: colors.muted,
      fontSize: 13,
      fontWeight: "700",
    },

    tagsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    tag: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },

    tagText: {
      fontSize: 12,
      fontWeight: "900",
    },

    empty: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },

    button: {
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.tint,
      marginTop: 4,
    },

    buttonText: {
      color: "white",
      fontWeight: "900",
      fontSize: 16,
    },

    sectionTitle: {
  color: colors.text,
  fontSize: 18,
  fontWeight: "900",
},

commentCard: {
  backgroundColor: colors.background,
  borderRadius: 14,
  padding: 12,
  borderWidth: 1,
  borderColor: colors.border,
  gap: 10,
},

commentHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

commentAvatar: {
  width: 38,
  height: 38,
  borderRadius: 999,
},

commentAvatarFallback: {
  width: 38,
  height: 38,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.tint,
},

commentAvatarText: {
  color: "white",
  fontSize: 16,
  fontWeight: "900",
},

commentUserBlock: {
  flex: 1,
},

commentPseudo: {
  color: colors.text,
  fontSize: 14,
  fontWeight: "900",
},

commentDate: {
  color: colors.muted,
  fontSize: 12,
  fontWeight: "700",
},

commentContent: {
  color: colors.text,
  fontSize: 14,
  lineHeight: 21,
},



commentsList: {
  gap: 12,
},



commentReplyCard: {
  marginLeft: 18,
  marginTop: 8,
},



replyButtonText: {
  color: colors.tint,
  fontSize: 13,
  fontWeight: "900",
},

repliesContainer: {
  gap: 8,
},

commentForm: {
  gap: 10,
},

commentInput: {
  minHeight: 80,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: colors.background,
  color: colors.text,
  paddingHorizontal: 12,
  paddingVertical: 10,
  textAlignVertical: "top",
  fontSize: 14,
},

inputPlaceholder: {
  color: colors.muted,
},

commentFormActions: {
  flexDirection: "row",
  gap: 10,
  justifyContent: "flex-end",
},

sendButton: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.tint,
},

sendButtonText: {
  color: "white",
  fontSize: 14,
  fontWeight: "900",
},

cancelButton: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
},

cancelButtonText: {
  color: colors.text,
  fontSize: 14,
  fontWeight: "900",
},
  });

  
}