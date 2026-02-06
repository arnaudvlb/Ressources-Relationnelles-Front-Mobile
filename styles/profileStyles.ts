import { StyleSheet } from "react-native";

export function makeProfileStyles(colors: any) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      gap: 16,
    },

    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: "800",
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 14,
    },

    muted: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },

    logoutButton: {
      marginTop: 6,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: "#EF4444",
    },

    logoutText: {
      color: "white",
      fontWeight: "900",
      fontSize: 16,
    },

    /* ========================= */
    /* ===== AJOUT ADMIN ======= */
    /* ========================= */

    adminButton: {
      marginTop: 6,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#2563EB",
      backgroundColor: "#2563EB1A",
    },

    adminText: {
      color: "#2563EB",
      fontWeight: "900",
      fontSize: 16,
    },
  });
}
