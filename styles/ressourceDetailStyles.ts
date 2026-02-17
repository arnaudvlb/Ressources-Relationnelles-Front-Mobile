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
    badge: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "900",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      alignItems: "center",
    },
    metaText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "800",
    },
    content: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
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
  });
}