import { StyleSheet } from "react-native";

export function makeResourcesListStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 18,
      gap: 12,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "900",
    },
    subtitle: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },
    listContent: {
      gap: 12,
      paddingBottom: 24,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    titleText: {
      color: colors.text,
      fontSize: 16,
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
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      alignItems: "center",
    },
    metaText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "800",
    },
    tagsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 2,
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
      marginTop: 10,
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },
  });
}