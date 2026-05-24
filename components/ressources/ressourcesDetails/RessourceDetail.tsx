import RessourceEmpty from "@/components/ressources/ressourcesDetails/RessourceEmpty";
import RessourceHeader from "@/components/ressources/ressourcesDetails/RessourceHeader";
import RessourceMedia from "@/components/ressources/ressourcesDetails/RessourceMedia";
import RessourceStats from "@/components/ressources/ressourcesDetails/RessourceStats";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiGetRessource } from "@/services/resourcesApi";
import {
  apiRemoveFavoris,
  apiRemoveLike,
  apiSetConsultation,
  apiSetFavoris,
  apiSetLike,
} from "@/services/statsApi";
import { getCurrentUser } from "@/services/userStorage";
import { Commentaire } from "@/types/commentaires";
import { Ressource } from "@/types/ressources";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRessourceDetailStyles } from "./module.RessourceDetail.style";
import RessourceComments from "./RessourceCommentaire";

interface Props {
  id: number;
}

export default function RessourceDetail({ id }: Readonly<Props>) {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeRessourceDetailStyles(colors);

  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const [liked, setLiked] = useState(false);
  const [favoris, setFavoris] = useState(false);

  const [idLike, setIdLike] = useState(0);
  const [idFavoris, setIdFavoris] = useState(0);

  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  useEffect(() => {
    loadRessource();
  }, [id]);

  function getUserId(user: any): number | null {
    if (!user) return null;

    if (typeof user === "number") return user;

    if (typeof user === "string") {
      const id = Number(user.split("/").pop());
      return isNaN(id) ? null : id;
    }

    return user.id ?? user.id_utilisateur ?? null;
  }

  function getRessourceId(ressourceValue: any): number | null {
    if (!ressourceValue) return null;

    if (typeof ressourceValue === "number") return ressourceValue;

    if (typeof ressourceValue === "string") {
      const id = Number(ressourceValue.split("/").pop());
      return isNaN(id) ? null : id;
    }

    return (
      ressourceValue.id_ressource ??
      ressourceValue.id_resource ??
      ressourceValue.id ??
      null
    );
  }

  function getApiId(response: any): number {
    return response?.id ?? response?.data?.id ?? 0;
  }

  async function loadRessource() {
    try {
      setLoading(true);
      setError(null);
      setRessource(null);

      console.log("========== LOAD RESSOURCE ==========");
      console.log("ID reçu dans RessourceDetail :", id);

      const currentUser = await getCurrentUser();

      console.log("Utilisateur connecté :", currentUser);
      console.log("ID utilisateur détecté :", getUserId(currentUser));

      const r: any = await apiGetRessource(id);

      console.log("RESSOURCE APRÈS apiGetRessource :", r);
      console.log("ID ressource détecté :", getRessourceId(r));

      console.log("likeCount reçu :", r.likeCount);
      console.log("viewsCount reçu :", r.viewsCount);

      console.log("isLike reçu :", r.isLike);
      console.log("is_like reçu :", r.is_like);
      console.log("idLike reçu :", r.idLike);
      console.log("id_like reçu :", r.id_like);

      console.log("is_favorite reçu :", r.is_favorite);
      console.log("isFavorite reçu :", r.isFavorite);
      console.log("idFavoris reçu :", r.idFavoris);
      console.log("id_favoris reçu :", r.id_favoris);

      console.log("commentaires reçus :", r.commentaire ?? r.commentaires);

      const nextViews = r.viewsCount ?? r.views_count ?? 0;
      const nextLikeCount = r.likeCount ?? r.like_count ?? 0;

      const nextLiked = r.isLike ?? r.is_like ?? false;
      const nextFavoris = r.is_favorite ?? r.isFavorite ?? false;

      const nextIdLike = r.idLike ?? r.id_like ?? 0;
      const nextIdFavoris = r.idFavoris ?? r.id_favoris ?? 0;

      console.log("STATE calculé nextViews :", nextViews);
      console.log("STATE calculé nextLikeCount :", nextLikeCount);
      console.log("STATE calculé nextLiked :", nextLiked);
      console.log("STATE calculé nextFavoris :", nextFavoris);
      console.log("STATE calculé nextIdLike :", nextIdLike);
      console.log("STATE calculé nextIdFavoris :", nextIdFavoris);

      setRessource(r);
      setViews(nextViews);
      setLikeCount(nextLikeCount);
      setLiked(nextLiked);
      setFavoris(nextFavoris);
      setIdLike(nextIdLike);
      setIdFavoris(nextIdFavoris);
      setCommentaires(r.commentaire ?? r.commentaires ?? []);

      await handleSetConsultation(r);

      console.log("========== FIN LOAD RESSOURCE ==========");
    } catch (e: any) {
      console.log("Erreur détail ressource :", e);
      setError(e?.message ?? "Impossible de charger la ressource.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleLike() {
    if (!ressource) return;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    const userId = getUserId(currentUser);
    const ressourceId = getRessourceId(ressource);

    console.log("========== TOGGLE LIKE ==========");
    console.log("liked avant clic :", liked);
    console.log("idLike avant clic :", idLike);
    console.log("likeCount avant clic :", likeCount);
    console.log("currentUser :", currentUser);
    console.log("userId like :", userId);
    console.log("ressource :", ressource);
    console.log("ressourceId like :", ressourceId);

    if (!userId || !ressourceId) {
      console.log("Impossible de liker : userId ou ressourceId manquant.");
      return;
    }

    try {
      if (liked) {
        if (!idLike) {
          console.log("Aucun idLike, suppression impossible.");
          return;
        }

        console.log("Suppression like avec id :", idLike);

        await apiRemoveLike(idLike);

        setLiked(false);
        setIdLike(0);
        setLikeCount((prev) => Math.max(prev - 1, 0));

        console.log("Like supprimé côté front.");
        console.log("========== FIN TOGGLE LIKE ==========");
        return;
      }

      const payload = {
        dateAdorer: new Date().toISOString(),
        utilisateur: `/api/utilisateurs/${userId}`,
        resource: `/api/ressources/${ressourceId}`,
      };

      console.log("Payload like envoyé :", payload);

      const next: any = await apiSetLike(payload);

      console.log("Réponse ajout like :", next);

      const newIdLike = getApiId(next);

      setLiked(true);
      setIdLike(newIdLike);
      setLikeCount((prev) => prev + 1);

      console.log("Like ajouté côté front.");
      console.log("Nouvel idLike :", newIdLike);
      console.log("========== FIN TOGGLE LIKE ==========");
    } catch (e) {
      console.log("Erreur like :", e);
    }
  }

  async function handleToggleFavoris() {
    if (!ressource) return;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    const userId = getUserId(currentUser);
    const ressourceId = getRessourceId(ressource);

    console.log("========== TOGGLE FAVORIS ==========");
    console.log("favoris avant clic :", favoris);
    console.log("idFavoris avant clic :", idFavoris);
    console.log("currentUser :", currentUser);
    console.log("userId favoris :", userId);
    console.log("ressource :", ressource);
    console.log("ressourceId favoris :", ressourceId);

    if (!userId || !ressourceId) {
      console.log("Impossible d'ajouter en favori : userId ou ressourceId manquant.");
      return;
    }

    try {
      if (favoris) {
        if (!idFavoris) {
          console.log("Aucun idFavoris, suppression impossible.");
          return;
        }

        console.log("Suppression favori avec id :", idFavoris);

        await apiRemoveFavoris(idFavoris);

        setFavoris(false);
        setIdFavoris(0);

        console.log("Favori supprimé côté front.");
        console.log("========== FIN TOGGLE FAVORIS ==========");
        return;
      }

      const payload = {
        utilisateur: `/api/utilisateurs/${userId}`,
        resource: `/api/ressources/${ressourceId}`,
      };

      console.log("Payload favori envoyé :", payload);

      const next: any = await apiSetFavoris(payload);

      console.log("Réponse ajout favori :", next);

      const newIdFavoris = getApiId(next);

      setFavoris(true);
      setIdFavoris(newIdFavoris);

      console.log("Favori ajouté côté front.");
      console.log("Nouvel idFavoris :", newIdFavoris);
      console.log("========== FIN TOGGLE FAVORIS ==========");
    } catch (e) {
      console.log("Erreur favoris :", e);
    }
  }

  async function handleSetConsultation(ressourceLoaded: Ressource) {
    try {
      const currentUser = await getCurrentUser();

      const userId = getUserId(currentUser);
      const ressourceId = getRessourceId(ressourceLoaded);

      console.log("========== CONSULTATION ==========");
      console.log("currentUser consultation :", currentUser);
      console.log("userId consultation :", userId);
      console.log("ressourceLoaded consultation :", ressourceLoaded);
      console.log("ressourceId consultation :", ressourceId);

      if (!ressourceId) {
        console.log("Impossible de créer la consultation : id ressource introuvable.");
        return;
      }

      const payload = {
        dateConsultation: new Date().toISOString(),
        utilisateur: userId ? `/api/utilisateurs/${userId}` : null,
        resource: `/api/ressources/${ressourceId}`,
      };

      console.log("payload consultation envoyé :", payload);

      const response = await apiSetConsultation(payload);

      console.log("response consultation :", response);

      setViews((prev) => {
        console.log("views avant incrément :", prev);
        return prev + 1;
      });

      console.log("========== FIN CONSULTATION ==========");
    } catch (e) {
      console.log("Erreur consultation :", e);
    }
  }

  function handleCommentaireAdded(commentaire: Commentaire) {
    setCommentaires((prev) => [commentaire, ...prev]);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.empty}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen}>
        <RessourceEmpty
          styles={styles}
          title="Erreur"
          empty={error}
          buttonText="Retour"
        />
      </SafeAreaView>
    );
  }

  if (!ressource) {
    return (
      <SafeAreaView style={styles.screen}>
        <RessourceEmpty
          styles={styles}
          title="Ressource introuvable"
          empty={`Impossible de trouver la ressource #${String(id)}`}
          buttonText="Retour"
        />
      </SafeAreaView>
    );
  }

  const datetext = ressource.date_creation
    ? String(ressource.date_creation).slice(0, 10)
    : "-";

  const medias = ressource.medias ?? [];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
        <RessourceHeader styles={styles} ressource={ressource} />

        <RessourceStats
          styles={styles}
          ressource={ressource}
          views={views}
          likeCount={likeCount}
          datetext={datetext}
          handleActionFavoris={handleToggleFavoris}
          handleActionLike={handleToggleLike}
          favoris={favoris}
          liked={liked}
        />

        <RessourceMedia styles={styles} colors={colors} medias={medias} />

        <RessourceComments
          styles={styles}
          ressource={ressource}
          commentaires={commentaires}
          onCommentaireAdded={handleCommentaireAdded}
        />

        <Pressable
          onPress={() => router.push("/ressources")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retour à la liste</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}