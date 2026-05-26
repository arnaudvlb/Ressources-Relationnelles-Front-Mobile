import { API_BASE_URL } from "@/config/api";
import { getUserId } from "@/config/format";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  apiCreateAmi,
  apiGetAllAmis,
  apiGetAllUsers,
} from "@/services/amiApi";
import { getCurrentUser } from "@/services/userStorage";
import { Ami } from "@/types/amis";
import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AmisEmpty from "./AmisEmpty";
import AmisListHeader from "./AmisListHeader";
import AmisLoading from "./AmisLoading";
import AmisNoUser from "./AmisNoUser";
import { makeAmisStyles } from "./module.AmisList.style";

// En attendant une vraie API, tu peux remettre ces mocks si besoin.

// const mockUsers: UserAPI[] = [
//   {
//     id: 1,
//     pseudo: "alice",
//     prenom: "Alice",
//     nom: "Dupont",
//     email: "alice@example.com",
//     telephone: "0600000001",
//     statusCompte: true,
//     dateCreation: "",
//     photo_profil: null,
//   },
// ];

// const mockAmis: Ami[] = [
//   {
//     id: 1,
//     statut: "accepte",
//     dateAction: "2026-05-22T10:00:00.000Z",
//     demandeur: mockUsers[0],
//     ami: mockUsers[1],
//   },
// ];

function normalizeArrayResponse<T>(response: any): T[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.member)) {
    return response.member;
  }

  if (Array.isArray(response?.["hydra:member"])) {
    return response["hydra:member"];
  }

  return [];
}

function buildImageUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http") || path.startsWith("file://")) {
    return path;
  }

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(
    /\/$/,
    ""
  );

  const formattedPath = path.startsWith("/") ? path : `/${path}`;

  return `${backendBaseUrl}${formattedPath}`;
}

function isAlreadyFriend(
  userId: number,
  relations: Ami[],
  connectedUserId: number
) {
  return relations.some((relation) => {
    const demandeurId = getUserId(relation.demandeur);
    const amiId = getUserId(relation.ami);

    const currentToUser = demandeurId === connectedUserId && amiId === userId;

    const userToCurrent = demandeurId === userId && amiId === connectedUserId;

    return currentToUser || userToCurrent;
  });
}

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

  async function loadData() {
    try {
      setLoading(true);

      const connectedUser = await getCurrentUser();

      if (!connectedUser) {
        setCurrentUser(null);
        setUsers([]);
        setAmis([]);
        return;
      }

      setCurrentUser(connectedUser);

      const connectedUserId = getUserId(connectedUser);

      if (!connectedUserId) {
        setUsers([]);
        setAmis([]);
        return;
      }

      const usersResponse = await apiGetAllUsers();

      const allUsers = normalizeArrayResponse<UserAPI>(usersResponse);

      const amisResponse = await apiGetAllAmis();

      const allAmis = normalizeArrayResponse<Ami>(amisResponse);

      setAmis(allAmis);

      // Version mock à remettre si besoin pour tester sans API.
      // const allUsers = mockUsers;
      // const allAmis = mockAmis;
      // setAmis(mockAmis);

      const filteredUsers = allUsers.filter((user) => {
        const userId = getUserId(user);

        if (!userId) {
          return false;
        }

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
      console.error("Erreur chargement amis :", error);

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
      demandeur: connectedUserId,
      ami: friendUserId,
    };

    try {
      setAddingIds((prev) => [...prev, friendUserId]);

      await apiCreateAmi(payload);

      setUsers((prev) =>
        prev.filter((user) => getUserId(user) !== friendUserId)
      );

      Alert.alert("Ami ajouté", "L'utilisateur a bien été ajouté à tes amis.");
    } catch (error) {
      console.error("Erreur création ami :", error);

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
        <AmisListHeader styles={styles} />

        {users.length === 0 ? (
          <AmisEmpty styles={styles} />
        ) : (
          users.map((user) => {
            const userId = getUserId(user);

            if (!userId) {
              return null;
            }

            const isAdding = addingIds.includes(userId);

            const photoUrl = buildImageUrl(user.photo_profil);

            return (
              <View key={userId} style={styles.userCard}>
                {photoUrl ? (
                  <Image source={{ uri: photoUrl }} style={styles.avatar} />
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
                    pressed ? styles.buttonPressed : null,
                    isAdding ? styles.disabledButton : null,
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