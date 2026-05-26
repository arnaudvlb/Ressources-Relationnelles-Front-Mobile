import { formatDate, getUserId } from "@/config/format";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
// import { apiGetAmis } from "@/services/amiApi";
// import { apiGetAllMessages } from "@/services/messageApi";
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
import MessageListEmpty from "./MessageListEmpty";
import MessgaeListHeader from "./MessageListHeader";
import MessageListLoading from "./MessageListLoading";
import MessageListNoUser from "./MessageListNoUser";
import { makeMessagerieStyles } from "./module.MessageList.styles";

type Conversation = {
  user: UserAPI;
  lastMessage: Message | null;
};

// En attendant une vraie API
const mockUsers: UserAPI[] = [
  {
    id: 1,
    pseudo: "alice",
    prenom: "Alice",
    nom: "Dupont",
    email: "alice@example.com",
    telephone: "0600000001",
    statusCompte: true,
    dateCreation: "",
    photo_profil: null,
  },
  {
    id: 2,
    pseudo: "leo",
    prenom: "Léo",
    nom: "Martin",
    email: "leo@example.com",
    telephone: "0600000002",
    statusCompte: true,
    dateCreation: "",
    photo_profil: null,
  },
  {
    id: 3,
    pseudo: "emma",
    prenom: "Emma",
    nom: "Bernard",
    email: "emma@example.com",
    telephone: "0600000003",
    statusCompte: true,
    dateCreation: "",
    photo_profil: null,
  },
  {
    id: 4,
    pseudo: "nina",
    prenom: "Nina",
    nom: "Petit",
    email: "nina@example.com",
    telephone: "0600000004",
    statusCompte: true,
    dateCreation: "",
    photo_profil: null,
  },
];

const mockAmis: Ami[] = [
  {
    id: 1,
    statut: "accepte",
    dateAction: "2026-05-22T10:00:00.000Z",
    demandeur: mockUsers[0],
    ami: mockUsers[1],
  },
  {
    id: 2,
    statut: "accepte",
    dateAction: "2026-05-22T11:00:00.000Z",
    demandeur: mockUsers[2],
    ami: mockUsers[0],
  },
  {
    id: 3,
    statut: "accepte",
    dateAction: "2026-05-22T12:00:00.000Z",
    demandeur: mockUsers[0],
    ami: mockUsers[3],
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    contenu: "Coucou, merci pour la ressource, elle m’a bien aidé !",
    pieceJointe: null,
    dateEnvoi: "2026-05-22T14:15:00.000Z",
    expediteur: mockUsers[1],
    destinataire: mockUsers[0],
  },
  {
    id: 2,
    contenu: "Avec plaisir, contente que ça t’ait été utile.",
    pieceJointe: null,
    dateEnvoi: "2026-05-22T14:20:00.000Z",
    expediteur: mockUsers[0],
    destinataire: mockUsers[1],
  },
  {
    id: 3,
    contenu: "Tu aurais une ressource sur la communication en famille ?",
    pieceJointe: null,
    dateEnvoi: "2026-05-22T15:05:00.000Z",
    expediteur: mockUsers[2],
    destinataire: mockUsers[0],
  },
];

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

      console.log(" Utilisateur connecté :", connectedUser);

      if (!connectedUser) {
        setCurrentUser(null);
        setAmis([]);
        setMessages([]);
        return;
      }

      setCurrentUser(connectedUser);

      /*
        À réactiver quand tes API seront prêtes :

        const amisResponse = await apiGetAmis();

        const allAmis = Array.isArray(amisResponse)
          ? amisResponse
          : amisResponse.member ?? [];

        setAmis(allAmis);

        const messagesResponse = await apiGetAllMessages();

        const allMessages = Array.isArray(messagesResponse)
          ? messagesResponse
          : messagesResponse.member ?? [];

        setMessages(allMessages);
      */

      setAmis(mockAmis);
      setMessages(mockMessages);
    } catch (error) {
      console.error(" Erreur chargement messagerie :", error);

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

    console.log(" ID utilisateur courant :", currentUserId);
    console.log(" Amis récupérés :", amis);
    console.log(" Messages récupérés :", messages);

    if (!currentUserId) return [];

    //Evolution avec le type d'amitie possible 
    const amisAcceptes = amis;

    const conversationsList = amisAcceptes
      .map((relation): Conversation | null => {
        const demandeurId = relation.demandeur?.id;
        const amiId = relation.ami?.id;

        if (!demandeurId || !amiId) {
          console.log(" Relation ami invalide :", relation);
          return null;
        }

        const friendUser =
          demandeurId === currentUserId ? relation.ami : relation.demandeur;

        if (!friendUser?.id) {
          console.log(" Ami introuvable dans la relation :", relation);
          return null;
        }

        const messagesWithFriend = messages.filter((message) => {
          const expediteur = message.expediteur as UserAPI;
          const destinataire = message.destinataire as UserAPI;

          const expediteurId = expediteur?.id;
          const destinataireId = destinataire?.id;

          return (
            (expediteurId === currentUserId &&
              destinataireId === friendUser.id) ||
            (expediteurId === friendUser.id &&
              destinataireId === currentUserId)
          );
        });

        const sortedMessages = [...messagesWithFriend].sort((a, b) => {
          const dateA = new Date(a.dateEnvoi).getTime();
          const dateB = new Date(b.dateEnvoi).getTime();

          return dateB - dateA;
        });

        const lastMessage = sortedMessages[0] ?? null;

        return {
          user: friendUser,
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
            const userId = user.id;
            const lastMessage = conversation.lastMessage;

            if (!userId) return null;

            return (
              <Pressable
                key={userId}
                style={({ pressed }) => [
                  styles.conversationCard,
                  pressed && styles.cardPressed,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/messages/[userId]",
                    params: { userId: String(userId) },
                  })
                }
              >
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