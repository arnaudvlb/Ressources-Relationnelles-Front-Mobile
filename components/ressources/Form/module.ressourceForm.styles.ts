import { StyleSheet } from "react-native";

export function makeRessourceFormStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      padding: 24,
      paddingBottom: 40,
      gap: 16,
    },

    title: {
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "900",
      color: colors.text,
    },

    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.muted,
    },

    card: {
      gap: 18,
      borderRadius: 24,
      padding: 18,
      backgroundColor: colors.card ?? colors.background,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
    },

    fieldGroup: {
      gap: 10,
    },

    label: {
      color: colors.muted,
      fontWeight: "800",
      fontSize: 14,
    },

    optionsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },

    optionButton: {
      paddingVertical: 9,
      paddingHorizontal: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
      backgroundColor: colors.background,
    },

    optionButtonSelected: {
      backgroundColor: colors.tint,
      borderColor: colors.tint,
    },

    optionText: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.text,
    },

    optionTextSelected: {
      color: colors.buttonText ?? "#FFFFFF",
    },

    visibilityButton: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border ?? "rgba(255,255,255,0.12)",
      backgroundColor: colors.background,
    },

    visibilityText: {
      color: colors.text,
      fontWeight: "800",
      textAlign: "center",
    },

    submitButton: {
      marginTop: 4,
      paddingVertical: 14,
      borderRadius: 18,
      alignItems: "center",
      backgroundColor: colors.tint,
    },

    submitText: {
      color: colors.buttonText ?? "#FFFFFF",
      fontSize: 16,
      fontWeight: "900",
    },

    disabledButton: {
      opacity: 0.6,
    },

    emptyText: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },
    visibilityButtonActive: {
    borderColor: colors.tint,
  },
  });
}