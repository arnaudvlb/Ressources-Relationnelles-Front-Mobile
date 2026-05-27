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

type Props = {
  userId: string;
};

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

      const messagesResponse = await apiGetAllMessages();
      const allMessages = normalizeArrayResponse<Message>(messagesResponse);

      setMessages(allMessages);
    } catch (error) {
      console.error("Erreur chargement conversation :", error);

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

    return (messages ?? [])
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

    const messageWithOtherUser = (messages ?? []).find((message) => {
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
      console.error("Erreur envoi message :", error);

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