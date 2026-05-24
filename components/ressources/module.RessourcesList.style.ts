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

    filtersContainer: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    searchInput: {
      color: colors.text,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 14,
    },
    filterTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
      marginTop: 4,
    },
    filtersRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    filterButtonActive: {
      borderColor: colors.tint,
      backgroundColor: colors.tint,
    },
    filterButtonText: {
      color: colors.muted,
      fontSize: 12,
      fontWeight: "800",
    },
    filterButtonTextActive: {
      color: colors.background,
      fontWeight: "900",
    },
    resetButton: {
      alignSelf: "flex-start",
      marginTop: 4,
      paddingVertical: 4,
    },
    resetButtonText: {
      color: colors.tint,
      fontSize: 13,
      fontWeight: "900",
    },
    addButton: {
      marginHorizontal: 16,
      marginBottom: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: colors.tint,
      alignItems: "center",
    },

    addButtonText: {
      color: colors.buttonText ?? "#FFFFFF",
      fontWeight: "900",
      fontSize: 15,
    },
  });
}