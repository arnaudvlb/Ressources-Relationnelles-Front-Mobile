import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiCreateMessage, apiGetAllMessages } from "@/services/messageApi";
import { getCurrentUser } from "@/services/userStorage";
import { Message } from "@/types/messages";
import { User } from "@/types/users";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getUserId } from "@/config/format";
import { UserAPI } from "@/types/API/usersAPI";
import MessageDetailAdd from "./MessageDetailAdd";
import MessageDetailEmpty from "./MessageDetailEmpty";
import MessageDetailHeader from "./MessageDetailHeader";
import MessageDetailItem from "./MessageDetailItem";
import MessageDetailLoading from "./MessageDetailLoading";
import MessageDetailNoOtherUser from "./MessageDetailNoOtherUsr";
import MessageDetailNoUser from "./MessageDetailNoUser";
import { makeConversationStyles } from "./module.MessageDetail";

// const mockUsers: User[] = [
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

type Props = {
  userId: string;
};

export default function MessageDetail({ userId }: Props) {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeConversationStyles(colors);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  const otherUserId = Number(userId);

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

      // Version API.
      const messagesResponse = await apiGetAllMessages();
      const allMessages =messagesResponse.member;

      setMessages(allMessages);

      // setMessages(mockMessages);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erreur",
        "Impossible de récupérer la conversation pour le moment."
      );
    } finally {
      setLoading(false);
    }
  }

  const conversationMessages = useMemo(() => {
    const currentUserId = getUserId(currentUser);

    if (!currentUserId || !otherUserId) {
      return [];
    }

    return messages
      .filter((message) => {
        const expediteurId = getUserId(message.expediteur);
        const destinataireId = getUserId(message.destinataire);

        const currentToOther =
          expediteurId === currentUserId && destinataireId === otherUserId;

        const otherToCurrent =
          expediteurId === otherUserId && destinataireId === currentUserId;

        return currentToOther || otherToCurrent;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dateEnvoi).getTime();
        const dateB = new Date(b.dateEnvoi).getTime();

        return dateA - dateB;
      });
  }, [messages, currentUser, otherUserId]);

  const otherUser = useMemo(() => {
    if (!otherUserId) {
      return null;
    }

    // Version mock à remettre si besoin pour tester sans API.
    // return mockUsers.find((user) => user.id === otherUserId) ?? null;

    const messageWithOtherUser = messages.find((message) => {
      const expediteurId = getUserId(message.expediteur);
      const destinataireId = getUserId(message.destinataire);

      return expediteurId === otherUserId || destinataireId === otherUserId;
    });

    if (messageWithOtherUser) {
      const expediteurId = getUserId(messageWithOtherUser.expediteur);

      if (expediteurId === otherUserId) {
        return messageWithOtherUser.expediteur;
      }

      return messageWithOtherUser.destinataire;
    }

    return {
      id: otherUserId,
      pseudo: `Utilisateur ${otherUserId}`,
      prenom: null,
      nom: null,
      email: "",
      telephone: null,
      photo_profil: null,
    } as UserAPI;
  }, [messages, otherUserId]);

  async function handleSendMessage() {
    const currentUserId = getUserId(currentUser);
    const content = messageText.trim();

    if (!currentUserId || !otherUserId || !content) {
      return;
    }

    try {
      const createdMessage = await apiCreateMessage({
        contenu: content,
        pieceJointe: null,
        dateEnvoie: new Date().toISOString(),
        id_expediteur: currentUserId,
        id_destinataire: otherUserId,
      });

      setMessages((prev) => [...prev, createdMessage]);
      setMessageText("");
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erreur",
        "Impossible d'envoyer le message pour le moment."
      );
    }
  }

  if (loading) {
    return <MessageDetailLoading styles={styles} />;
  }

  if (!currentUser) {
    return <MessageDetailNoUser styles={styles} />;
  }

  if (!otherUser) {
    return <MessageDetailNoOtherUser styles={styles} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <MessageDetailHeader styles={styles} otherUser={otherUser} />

        <ScrollView
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {conversationMessages.length === 0 ? (
            <MessageDetailEmpty styles={styles} otherUser={otherUser} />
          ) : (
            conversationMessages.map((message) => {
              const expediteurId = getUserId(message.expediteur);
              const currentUserId = getUserId(currentUser);
              const isMine = expediteurId === currentUserId;

              return (
                <MessageDetailItem
                  key={message.id}
                  styles={styles}
                  message={message}
                  isMine={isMine}
                />
              );
            })
          )}
        </ScrollView>

        <MessageDetailAdd
          styles={styles}
          messageText={messageText}
          setMessageText={setMessageText}
          colors={colors}
          handleSendMessage={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}