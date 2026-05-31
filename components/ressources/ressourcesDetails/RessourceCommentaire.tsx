import { getUserId } from "@/config/format";
import { apiMe } from "@/services/authApi";
import { apiCreateCommentaire } from "@/services/commentaireApi";
import { getCurrentUser } from "@/services/userStorage";
import { Commentaire } from "@/types/commentaires";
import { Ressource } from "@/types/ressources";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  styles: any;
  ressource: Ressource;
  commentaires: Commentaire[] | null;
  onCommentaireAdded: (commentaire: Commentaire) => void;
};

export default function RessourceComments({
  styles,
  ressource,
  commentaires,
  onCommentaireAdded,
}: Readonly<Props>) {
  const [contenu, setContenu] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState<Commentaire | null>(null);
  const [loading, setLoading] = useState(false);

  const commentairesPrincipaux =
    commentaires?.filter((commentaire) => !commentaire.commentaireParent) ?? [];

  function getReponses(commentaireParent: Commentaire) {
    return (
      commentaires?.filter(
        (commentaire) =>
          commentaire.commentaireParent?.id_commentaire ===
            commentaireParent.id_commentaire &&
          commentaire.id_commentaire !== commentaireParent.id_commentaire
      ) ?? []
    );
  }

  async function handleCreateCommentaire() {
    const currentUser = await apiMe();

    router.replace("/login");

    if (!contenu.trim()) {
      return;
    }

     const userId = getUserId(currentUser);
    const ressourceId = ressource.id_ressource;

    if (!userId || !ressourceId) {
      console.log("Utilisateur ou ressource invalide :", {
        userId,
        ressourceId,
      });

      return;
    }

    const payload = {
      contenu: contenu.trim(),
      utilisateur: `/api/utilisateurs/${userId}`,
      resource: `/api/ressources/${ressourceId}`,
      commentaireParent: null,
    };

    try {
      setLoading(true);

      const commentaire = await apiCreateCommentaire(payload);

      onCommentaireAdded(commentaire);

      setContenu("");
    } catch (e) {
      console.log("Erreur création commentaire :", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateReponse() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (!replyTo) {
      return;
    }

    if (!replyContent.trim()) {
      return;
    }

    const userId = getUserId(currentUser);
    const ressourceId = ressource.id_ressource;
    const parentId = replyTo.id_commentaire;

    if (!userId || !ressourceId || !parentId) {
      console.log("Données invalides pour la réponse :", {
        userId,
        ressourceId,
        parentId,
      });

      return;
    }

    const payload = {
      contenu: replyContent.trim(),
      utilisateur: `/api/utilisateurs/${userId}`,
      resource: `/api/ressources/${ressourceId}`,
      commentaireParent: `/api/commentaires/${parentId}`,
    };

    try {
      setLoading(true);

      const commentaire = await apiCreateCommentaire(payload);

      onCommentaireAdded(commentaire);

      setReplyContent("");
      setReplyTo(null);
    } catch (e) {
      console.log("Erreur création réponse :", e);
    } finally {
      setLoading(false);
    }
  }

  function renderCommentaire(
    commentaire: Commentaire,
    isReponse = false,
    index = 0
  ) {
    const auteur = commentaire.auteur;
    const pseudo = auteur?.pseudo ?? "Utilisateur inconnu";
    const photoProfil = auteur?.photo_profil;

    const dateText = commentaire.date_creation
      ? String(commentaire.date_creation).slice(0, 10)
      : "";

    const reponses = getReponses(commentaire);

    const commentaireKey =
      commentaire.id_commentaire ?? `${isReponse ? "reponse" : "commentaire"}-${index}`;

    return (
      <View
        key={commentaireKey}
        style={[
          styles.commentCard,
          isReponse ? styles.commentReplyCard : null,
        ]}
      >
        <View style={styles.commentHeader}>
          {photoProfil ? (
            <Image source={{ uri: photoProfil }} style={styles.commentAvatar} />
          ) : (
            <View style={styles.commentAvatarFallback}>
              <Text style={styles.commentAvatarText}>
                {pseudo.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.commentUserBlock}>
            <Text style={styles.commentPseudo}>{pseudo}</Text>
            <Text style={styles.commentDate}>{dateText}</Text>
          </View>
        </View>

        <Text style={styles.commentContent}>{commentaire.contenu}</Text>

        {!isReponse ? (
          <Pressable
            onPress={() => {
              setReplyTo(commentaire);
              setReplyContent("");
            }}
          >
            <Text style={styles.replyButtonText}>Répondre</Text>
          </Pressable>
        ) : null}

        {!isReponse && replyTo?.id_commentaire === commentaire.id_commentaire ? (
          <View style={styles.commentForm}>
            <TextInput
              value={replyContent}
              onChangeText={setReplyContent}
              placeholder={`Répondre à ${pseudo}...`}
              placeholderTextColor={styles.inputPlaceholder?.color ?? "#999"}
              style={styles.commentInput}
              multiline
            />

            <View style={styles.commentFormActions}>
              <Pressable
                onPress={() => {
                  setReplyTo(null);
                  setReplyContent("");
                }}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </Pressable>

              <Pressable
                onPress={handleCreateReponse}
                style={styles.sendButton}
                disabled={loading}
              >
                <Text style={styles.sendButtonText}>
                  {loading ? "Envoi..." : "Répondre"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {!isReponse && reponses.length > 0 ? (
          <View style={styles.repliesContainer}>
            {reponses.map((reponse, reponseIndex) =>
              renderCommentaire(reponse, true, reponseIndex)
            )}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Commentaires</Text>

      <View style={styles.commentForm}>
        <TextInput
          value={contenu}
          onChangeText={setContenu}
          placeholder="Écrire un commentaire..."
          placeholderTextColor={styles.inputPlaceholder?.color ?? "#999"}
          style={styles.commentInput}
          multiline
        />

        <Pressable
          onPress={handleCreateCommentaire}
          style={styles.sendButton}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>
            {loading ? "Envoi..." : "Publier"}
          </Text>
        </Pressable>
      </View>

      {commentairesPrincipaux.length === 0 ? (
        <Text style={styles.empty}>Aucun commentaire pour le moment.</Text>
      ) : (
        <View style={styles.commentsList}>
          {commentairesPrincipaux.map((commentaire, index) =>
            renderCommentaire(commentaire, false, index)
          )}
        </View>
      )}
    </View>
  );
}


