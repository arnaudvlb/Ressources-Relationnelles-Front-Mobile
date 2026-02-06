import { StyleSheet } from "react-native";

export function makeAdminUsersStyles(colors: any) {
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
      fontWeight: "800",
    },
    subtitle: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    rowTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    name: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800",
    },
    email: {
      color: colors.muted,
      fontSize: 13,
      marginTop: 2,
    },
    badgesRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
      flexWrap: "wrap",
    },
    badge: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    badgeText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "800",
    },
    badgeDanger: {
      borderColor: "#EF4444",
    },
    badgeDangerText: {
      color: "#EF4444",
    },
    badgeOk: {
      borderColor: "#22C55E",
    },
    badgeOkText: {
      color: "#22C55E",
    },
    actionsRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },
    btn: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    btnText: {
      color: colors.text,
      fontWeight: "900",
    },
    btnDanger: {
      borderColor: "#EF4444",
      backgroundColor: "#EF44441A",
    },
    btnDangerText: {
      color: "#EF4444",
    },
    btnOk: {
      borderColor: "#22C55E",
      backgroundColor: "#22C55E1A",
    },
    btnOkText: {
      color: "#22C55E",
    },
    select: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: colors.card,
    },
  });
}