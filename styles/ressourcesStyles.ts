import { StyleSheet } from "react-native";

export function makeResourcesStyles(colors: any) {
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
    search: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingVertical: 12,
      color: colors.text,
    },
    filtersRow: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    chipActive: {
      borderColor: colors.tint,
      backgroundColor: `${colors.tint}1A`,
    },
    chipText: {
      color: colors.text,
      fontWeight: "800",
      fontSize: 12,
    },
    chipTextActive: {
      color: colors.tint,
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
      gap: 8,
    },
    cardTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    cardTitle: {
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
      color: colors.muted,
      fontSize: 12,
      fontWeight: "800",
    },
    cardDesc: {
      color: colors.muted,
      fontSize: 13,
      lineHeight: 18,
    },
    tagsRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
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
      color: colors.text,
      fontSize: 12,
      fontWeight: "800",
    },
    resetBtn: {
      paddingVertical: 12,
      borderRadius: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    resetText: {
      color: colors.text,
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