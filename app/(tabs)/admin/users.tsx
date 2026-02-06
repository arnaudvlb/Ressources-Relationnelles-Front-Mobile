import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeAdminUsersStyles } from "@/styles/adminUsersStyles";
import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// type de role
type Role =
  | "ROLE_USER"
  | "ROLE_MODERATEUR"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN";

// Type d'utilisateur (class)
type UserItem = {
  id: string;
  username: string;
  email: string;
  role: Role;
  isActive: boolean;
};

// Simulation du role a remplacer par GET
const CURRENT_ROLE: Role = "ROLE_ADMIN";

// Liste mock d’utilisateurs  a remplacer par l'api
const MOCK_USERS: UserItem[] = [
  { id: "1", username: "Andrea", email: "andrea@test.com", role: "ROLE_USER", isActive: true },
  { id: "2", username: "Mod", email: "mod@test.com", role: "ROLE_MODERATEUR", isActive: true },
  { id: "3", username: "Admin", email: "admin@test.com", role: "ROLE_ADMIN", isActive: true },
  { id: "4", username: "Super", email: "super@test.com", role: "ROLE_SUPER_ADMIN", isActive: true },
  { id: "5", username: "CompteOff", email: "off@test.com", role: "ROLE_USER", isActive: false },
];


export default function AdminUsersScreen() {

  // Récupération du thème
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeAdminUsersStyles(colors);


  const [users, setUsers] = useState<UserItem[]>(MOCK_USERS);

  // Droit d'activation desactivation 
  const canToggleActive = useMemo(() => {
    return (
      CURRENT_ROLE === "ROLE_ADMIN" ||
      CURRENT_ROLE === "ROLE_SUPER_ADMIN"
    );
  }, []);

  // Droit changemlent de role 
  const canChangeRole = useMemo(() => {
    return CURRENT_ROLE === "ROLE_SUPER_ADMIN";
  }, []);

  // activation desaction   (a changer avec api )
  function toggleActive(userId: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  }

  // Changement de role ( a mchanger avec api )
  function changeRole(userId: string, role: Role) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
  }


  function renderItem({ item }: { item: UserItem }) {
    //texte statut
    const statusText = item.isActive ? "Actif" : "Désactivé";

    // texte role
    const roleText = item.role.replace("ROLE_", "");

    return (
      <View style={styles.card}>
        <View style={styles.rowTop}>
          <View>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>

        <View style={styles.badgesRow}>
          <View
            style={[
              styles.badge,
              item.isActive ? styles.badgeOk : styles.badgeDanger,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                item.isActive ? styles.badgeOkText : styles.badgeDangerText,
              ]}
            >
              {statusText}
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{roleText}</Text>
          </View>
        </View>

        {canToggleActive ? (
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => {
                Alert.alert(
                  item.isActive ? "Désactiver le compte" : "Activer le compte",
                  item.isActive
                    ? "Confirmer la désactivation de ce compte ?"
                    : "Confirmer l’activation de ce compte ?",
                  [
                    { text: "Annuler", style: "cancel" },
                    {
                      text: "Confirmer",
                      style: item.isActive ? "destructive" : "default",
                      onPress: () => toggleActive(item.id),
                    },
                  ]
                );
              }}
              style={[
                styles.btn,
                item.isActive ? styles.btnDanger : styles.btnOk,
              ]}
            >
              <Text
                style={[
                  styles.btnText,
                  item.isActive ? styles.btnDangerText : styles.btnOkText,
                ]}
              >
                {item.isActive ? "Désactiver" : "Activer"}
              </Text>
            </Pressable>
          </View>
        ) : null}

        {canChangeRole ? (
          <View style={styles.select}>
            <Picker
              selectedValue={item.role}
              onValueChange={(value) => {
                Alert.alert(
                  "Changer le rôle",
                  `Confirmer le changement de rôle en ${String(value).replace("ROLE_", "")} ?`,
                  [
                    { text: "Annuler", style: "cancel" },
                    {
                      text: "Confirmer",
                      onPress: () => changeRole(item.id, value as Role),
                    },
                  ]
                );
              }}
            >
              <Picker.Item label="USER" value="ROLE_USER" />
              <Picker.Item label="MODERATEUR" value="ROLE_MODERATEUR" />
              <Picker.Item label="ADMIN" value="ROLE_ADMIN" />
              <Picker.Item label="SUPER_ADMIN" value="ROLE_SUPER_ADMIN" />
            </Picker>
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Back-office utilisateurs</Text>
      <Text style={styles.subtitle}>
        Gestion des comptes (version mock). MODERATEUR/ADMIN : activation. SUPER_ADMIN : gestion des rôles.
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}