import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiCreateAmi, apiGetAllAmis, apiGetAllUsers, } from "@/services/amiApi";
import { getCurrentUser } from "@/services/userStorage";
import { Ami } from "@/types/amis";

import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AmisEmpty from "./AmisEmpty";
import AmisListHeader from "./AmisListHeader";
import AmisLoading from "./AmisLoading";
import AmisNoUser from "./AmisNoUser";
import { makeAmisStyles } from "./module.AmisList.style";

export default function AmisList() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeAmisStyles(colors);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserAPI[]>([]);
  const [amis, setAmis] = useState<Ami[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingIds, setAddingIds] = useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  function getUserId(value: any): number | null {
    if (!value) return null;

    if (typeof value === "number") return value;

    if (typeof value === "object" && value.id_utilisateur) {
      return Number(value.id_utilisateur);
    }

    if (typeof value === "object" && value.id) {
      return Number(value.id);
    }

    if (typeof value === "string") {
      const parts = value.split("/");
      const lastPart = parts[parts.length - 1];
      const id = Number(lastPart);

      return Number.isNaN(id) ? null : id;
    }

    return null;
  }

  function isAlreadyFriend(
    userId: number,
    relations: Ami[],
    connectedUserId: number
  ) {
    return relations.some((relation) => {
      const demandeurId = getUserId(relation.demandeur);
      const amiId = getUserId(relation.ami);

      return (
        (demandeurId === connectedUserId && amiId === userId) ||
        (demandeurId === userId && amiId === connectedUserId)
      );
    });
  }

  async function loadData() {
    try {
      setLoading(true);

      const connectedUser = await getCurrentUser();

      if (!connectedUser) {
        setCurrentUser(null);
        setUsers([]);
        return;
      }

      setCurrentUser(connectedUser);

      const usersResponse: any = await apiGetAllUsers();

      const allUsers: UserAPI[] = Array.isArray(usersResponse)
        ? usersResponse
        : usersResponse.member ?? [];

      const amisResponse = await apiGetAllAmis();

      const allAmis = amisResponse.member ?? [];

      setAmis(allAmis);

      const connectedUserId = getUserId(connectedUser);

      if (!connectedUserId) {
        setUsers([]);
        return;
      }

      const filteredUsers = allUsers.filter((user) => {
        const userId = getUserId(user);

        if (!userId) return false;

        const isNotCurrentUser = userId !== connectedUserId;

        const isNotFriend = !isAlreadyFriend(
          userId,
          allAmis,
          connectedUserId
        );

        return isNotCurrentUser && isNotFriend;
      });

      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erreur",
        "Impossible de récupérer la liste des utilisateurs."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAddFriend(friendUserId: number) {
  const connectedUserId = getUserId(currentUser);

  console.log("currentUser", currentUser);
  console.log("connectedUserId", connectedUserId);
  console.log("friendUserId", friendUserId);

  if (!connectedUserId) {
    Alert.alert("Erreur", "Impossible de récupérer l'utilisateur connecté.");
    return;
  }

  if (!friendUserId) {
    Alert.alert("Erreur", "Impossible de récupérer l'utilisateur à ajouter.");
    return;
  }

  const payload = {
    statut: "AMI",
    dateAction: new Date().toISOString(),
    demandeur: `/api/utilisateurs/${connectedUserId}`,
    ami: `/api/utilisateurs/${friendUserId}`,
  };

  console.log("payload envoyé à apiCreateAmi", payload);

  try {
    setAddingIds((prev) => [...prev, friendUserId]);

    const response = await apiCreateAmi(payload);

    console.log("response apiCreateAmi", response);

    setUsers((prev) =>
      prev.filter((user) => getUserId(user) !== friendUserId)
    );

    Alert.alert("Ami ajouté", "L'utilisateur a bien été ajouté à tes amis.");
  } catch (error) {
    console.error("Erreur création ami", error);

    Alert.alert(
      "Erreur",
      "Impossible d'ajouter cet utilisateur en ami pour le moment."
    );
  } finally {
    setAddingIds((prev) => prev.filter((id) => id !== friendUserId));
  }
}

  if (loading) {
    return <AmisLoading styles={styles} />;
  }

  if (!currentUser) {
    return <AmisNoUser styles={styles} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
       <AmisListHeader styles={styles}/>

        {users.length === 0 ? (
          <AmisEmpty styles={styles}/>
        ) : (
          users.map((user) => {
            const userId = getUserId(user);

            if (!userId) return null;

            const isAdding = addingIds.includes(userId);

            return (
              <View key={userId} style={styles.userCard}>
                {user.photo_profil ? (
                  <Image
                    source={{ uri: user.photo_profil }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {user.pseudo?.charAt(0)?.toUpperCase() ?? "U"}
                    </Text>
                  </View>
                )}

                <View style={styles.userInfo}>
                  <Text style={styles.pseudo}>@{user.pseudo}</Text>

                  <Text style={styles.name}>
                    {user.prenom || user.nom
                      ? `${user.prenom ?? ""} ${user.nom ?? ""}`.trim()
                      : "Utilisateur"}
                  </Text>
                </View>

                <Pressable
                  onPress={() => handleAddFriend(userId)}
                  disabled={isAdding}
                  style={({ pressed }) => [
                    styles.addButton,
                    pressed && styles.buttonPressed,
                    isAdding && styles.disabledButton,
                  ]}
                >
                  <Text style={styles.addButtonText}>
                    {isAdding ? "Ajout…" : "Ajouter"}
                  </Text>
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}