import { API_BASE_URL } from "@/config/api";
import { formatDate, getUserId } from "@/config/format";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { apiGetAllMessages } from "@/services/messageApi";
import { getCurrentUser } from "@/services/userStorage";
import { Ami } from "@/types/amis";
import { UserAPI } from "@/types/API/usersAPI";
import { Message } from "@/types/messages";
import { User } from "@/types/users";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { apiGetAllAmis } from '@/services/amiApi';
import MessageListEmpty from "./MessageListEmpty";
import MessgaeListHeader from "./MessageListHeader";
import MessageListLoading from "./MessageListLoading";
import MessageListNoUser from "./MessageListNoUser";
import { makeMessagerieStyles } from "./module.MessageList.styles";

type Conversation = {
  user: UserAPI;
  lastMessage: Message | null;
};

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
//   {
//     id: 2,
//     pseudo: "leo",
//     prenom: "Léo",
//     nom: "Martin",
//     email: "leo@example.com",
//     telephone: "0600000002",
//     statusCompte: true,
//     dateCreation: "",
//     photo_profil: null,
//   },
//   {
//     id: 3,
//     pseudo: "emma",
//     prenom: "Emma",
//     nom: "Bernard",
//     email: "emma@example.com",
//     telephone: "0600000003",
//     statusCompte: true,
//     dateCreation: "",
//     photo_profil: null,
//   },
//   {
//     id: 4,
//     pseudo: "nina",
//     prenom: "Nina",
//     nom: "Petit",
//     email: "nina@example.com",
//     telephone: "0600000004",
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
//   {
//     id: 2,
//     statut: "accepte",
//     dateAction: "2026-05-22T11:00:00.000Z",
//     demandeur: mockUsers[2],
//     ami: mockUsers[0],
//   },
//   {
//     id: 3,
//     statut: "accepte",
//     dateAction: "2026-05-22T12:00:00.000Z",
//     demandeur: mockUsers[0],
//     ami: mockUsers[3],
//   },
// ];

// const mockMessages: Message[] = [
//   {
//     id: 1,
//     contenu: "Coucou, merci pour la ressource, elle m’a bien aidé !",
//     pieceJointe: null,
//     dateEnvoi: "2026-05-22T14:15:00.000Z",
//     expediteur: mockUsers[1],
//     destinataire: mockUsers[0],
//   },
//   {
//     id: 2,
//     contenu: "Avec plaisir, contente que ça t’ait été utile.",
//     pieceJointe: null,
//     dateEnvoi: "2026-05-22T14:20:00.000Z",
//     expediteur: mockUsers[0],
//     destinataire: mockUsers[1],
//   },
//   {
//     id: 3,
//     contenu: "Tu aurais une ressource sur la communication en famille ?",
//     pieceJointe: null,
//     dateEnvoi: "2026-05-22T15:05:00.000Z",
//     expediteur: mockUsers[2],
//     destinataire: mockUsers[0],
//   },
// ];

function normalizeArrayResponse<T>(response: any): T[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.member)) {
    return response.member;
  }

  if (Array.isArray(response["hydra:member"])) {
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

export default function MessageList() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeMessagerieStyles(colors);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [amis, setAmis] = useState<Ami[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const connectedUser = await getCurrentUser();

      if (!connectedUser) {
        setCurrentUser(null);
        setAmis([]);
        setMessages([]);
        return;
      }

      setCurrentUser(connectedUser);

      const amisResponse = await apiGetAllAmis();
      const allAmis = normalizeArrayResponse<Ami>(amisResponse);

      const messagesResponse = await apiGetAllMessages();
      const allMessages = normalizeArrayResponse<Message>(messagesResponse);

      setAmis(allAmis);
      setMessages(allMessages);

      // Version mock à remettre si besoin pour tester sans API.
      // setAmis(mockAmis);
      // setMessages(mockMessages);
    } catch (error) {
      console.error("Erreur chargement messagerie :", error);

      Alert.alert(
        "Erreur",
        "Impossible de récupérer les conversations pour le moment."
      );
    } finally {
      setLoading(false);
    }
  }

  const conversations = useMemo(() => {
    const currentUserId = getUserId(currentUser);

    if (!currentUserId) {
      return [];
    }

    const amisAcceptes = amis

    const conversationsList = amisAcceptes
      .map((relation): Conversation | null => {
        const demandeurId = getUserId(relation.demandeur);
        const amiId = getUserId(relation.ami);

        if (!demandeurId || !amiId) {
          return null;
        }

        const friendUser =
          demandeurId === currentUserId ? relation.ami : relation.demandeur;

        const friendUserId = getUserId(friendUser);

        if (!friendUser || !friendUserId) {
          return null;
        }

        const messagesWithFriend = messages.filter((message) => {
          const expediteurId = getUserId(message.expediteur);
          const destinataireId = getUserId(message.destinataire);

          const currentToFriend =
            expediteurId === currentUserId && destinataireId === friendUserId;

          const friendToCurrent =
            expediteurId === friendUserId && destinataireId === currentUserId;

          return currentToFriend || friendToCurrent;
        });

        const sortedMessages = [...messagesWithFriend].sort((a, b) => {
          const dateA = new Date(a.dateEnvoi).getTime();
          const dateB = new Date(b.dateEnvoi).getTime();

          return dateB - dateA;
        });

        const lastMessage = sortedMessages[0] ?? null;

        return {
          user: friendUser as UserAPI,
          lastMessage,
        };
      })
      .filter((conversation): conversation is Conversation => {
        return conversation !== null;
      });

    return conversationsList.sort((a, b) => {
      const dateA = a.lastMessage
        ? new Date(a.lastMessage.dateEnvoi).getTime()
        : 0;

      const dateB = b.lastMessage
        ? new Date(b.lastMessage.dateEnvoi).getTime()
        : 0;

      return dateB - dateA;
    });
  }, [amis, messages, currentUser]);

  if (loading) {
    return <MessageListLoading styles={styles} />;
  }

  if (!currentUser) {
    return <MessageListNoUser styles={styles} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MessgaeListHeader styles={styles} />

        {conversations.length === 0 ? (
          <MessageListEmpty styles={styles} />
        ) : (
          conversations.map((conversation) => {
            const user = conversation.user;
            const userId = getUserId(user);
            const lastMessage = conversation.lastMessage;
            const photoUrl = buildImageUrl(user.photo_profil);

            if (!userId) {
              return null;
            }

            return (
              <Pressable
                key={userId}
                style={({ pressed }) => [
                  styles.conversationCard,
                  pressed ? styles.cardPressed : null,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/messages/[userId]",
                    params: { userId: String(userId) },
                  })
                }
              >
                {photoUrl ? (
                  <Image source={{ uri: photoUrl }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {user.pseudo?.charAt(0)?.toUpperCase() ?? "U"}
                    </Text>
                  </View>
                )}

                <View style={styles.conversationContent}>
                  <View style={styles.conversationTop}>
                    <Text style={styles.pseudo}>@{user.pseudo}</Text>

                    <Text style={styles.date}>
                      {lastMessage ? formatDate(lastMessage.dateEnvoi) : ""}
                    </Text>
                  </View>

                  <Text style={styles.name}>
                    {user.prenom || user.nom
                      ? `${user.prenom ?? ""} ${user.nom ?? ""}`.trim()
                      : "Utilisateur"}
                  </Text>

                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage
                      ? lastMessage.contenu
                      : "Aucun message pour le moment"}
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}