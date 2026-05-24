import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
// import { apiGetAllMessages } from "@/services/messageApi";
import { formatDate } from "@/config/format";
import { getCurrentUser } from "@/services/userStorage";
import { UserAPI } from "@/types/API/usersAPI";
import { Message } from "@/types/messages";
import { User } from "@/types/users";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageListEmpty from "./MessageListEmpty";
import MessgaeListHeader from "./MessageListHeader";
import MessageListLoading from "./MessageListLoading";
import MessageListNoUser from "./MessageListNoUser";
import { makeMessagerieStyles } from "./module.MessageList.styles";


type Conversation = {
  user: UserAPI;
  lastMessage: Message;
};


//En attendant une api sans iri
const mockUsers: UserAPI[] = [
  {
    id: 1,
    pseudo: "alice",
    prenom: "Alice",
    nom: "Dupont",
    email: "alice@example.com",
    telephone: "0600000001",
    statusCompte :true,
    dateCreation:"",
    photo_profil:null,

  },
  {
    id: 2,
    pseudo: "leo",
    prenom: "Léo",
    nom: "Martin",
    email: "leo@example.com",
    telephone: "0600000002",
    statusCompte :true,
    dateCreation:"",
    photo_profil:null,
  },
  {
    id: 3,
    pseudo: "emma",
    prenom: "Emma",
    nom: "Bernard",
    email: "emma@example.com",
    telephone: "0600000003",
    statusCompte :true,
    dateCreation:"",
    photo_profil:null,
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
        setMessages([]);
        return;
      }

      setCurrentUser(connectedUser);

      //section api a reactivé une fois la correction effectué 
      /*
      const messagesResponse = await apiGetAllMessages();

      const allMessages = Array.isArray(messagesResponse)
        ? messagesResponse
        : messagesResponse.member ?? [];

      setMessages(allMessages);
      */

      setMessages(mockMessages);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erreur",
        "Impossible de récupérer les conversations pour le moment."
      );
    } finally {
      setLoading(false);
    }
  }

  const conversations = useMemo(() => {
    const currentUserId = currentUser?.id ?? currentUser?.id_utilisateur;

    if (!currentUserId) return [];

    const map = new Map<number, Conversation>();

    messages.forEach((message) => {
      const expediteur = message.expediteur as UserAPI;
      const destinataire = message.destinataire as UserAPI;

      

      const expediteurId = expediteur.id;
      const destinataireId = destinataire.id;

      if (!expediteurId || !destinataireId) return;

      const isExpediteur = expediteurId === currentUserId;
      const isDestinataire = destinataireId === currentUserId;

      if (!isExpediteur && !isDestinataire) return;

      const otherUser = isExpediteur ? destinataire : expediteur;
      const otherUserId = otherUser.id;

      if (!otherUserId) return;

      const existingConversation = map.get(otherUserId);

      const currentMessageDate = new Date(message.dateEnvoi).getTime();

      const existingMessageDate = existingConversation
        ? new Date(existingConversation.lastMessage.dateEnvoi).getTime()
        : 0;


      if (!existingConversation || currentMessageDate > existingMessageDate) {
        map.set(otherUserId, {
          user: otherUser,
          lastMessage: message,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      const dateA = new Date(a.lastMessage.dateEnvoi).getTime();
      const dateB = new Date(b.lastMessage.dateEnvoi).getTime();

      return dateB - dateA;
    });
  }, [messages, currentUser]);

  if (loading) {
    return (
      <MessageListLoading styles={styles}/>
    );
  }

  if (!currentUser) {
    return (
     <MessageListNoUser styles={styles}/>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MessgaeListHeader styles={styles}/>

        {conversations.length === 0 ? (
          <MessageListEmpty styles={styles}/>
        ) : (

          conversations.map((conversation) => {
            const user = conversation.user;
            const userId = user.id;

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
                      {formatDate(conversation.lastMessage.dateEnvoi)}
                    </Text>
                  </View>

                  <Text style={styles.name}>
                    {user.prenom || user.nom
                      ? `${user.prenom ?? ""} ${user.nom ?? ""}`.trim()
                      : "Utilisateur"}
                  </Text>

                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage.contenu}
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