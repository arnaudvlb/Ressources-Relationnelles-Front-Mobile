import RessourceEmpty from "@/components/ressources/ressourcesDetails/RessourceEmpty";
import RessourceHeader from "@/components/ressources/ressourcesDetails/RessourceHeader";
import RessourceMedia from "@/components/ressources/ressourcesDetails/RessourceMedia";
import RessourceStats from "@/components/ressources/ressourcesDetails/RessourceStats";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { mapRessourcetoRessourceAPI } from "@/mappers/ressourceMapper";
import { mapUsertoUserAPi } from "@/mappers/userMapper";
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

  // Stats
  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const [liked, setLiked] = useState(false);
  const [favoris, setFavoris] = useState(false);

  const [idLike, setIdLike] = useState(0);
  const [idFavoris, setIdFavoris] = useState(0);

  // API
  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        setRessource(null);

        console.log("ID reçu dans RessourceDetail :", id);

        const r = await apiGetRessource(id);

        setRessource(r);

        setViews(r.viewsCount ?? 0);
        setLikeCount(r.likeCount ?? 0);

        setLiked(r.isLike ?? false);
        setFavoris(r.is_favorite ?? false);

        setIdLike(r.idLike ?? 0);
        setIdFavoris(r.idFavoris ?? 0);

        setCommentaires(r.commentaire ?? []);

        await handleSetConsultation(r);
      } catch (e: any) {
        console.log("Erreur détail ressource :", e);
        setError(e?.message ?? "Impossible de charger la ressource.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // Fonction like
  async function handleToggleLike() {
    if (!ressource) return;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      if (liked) {
        if (!idLike) return;

        await apiRemoveLike(idLike);

        setLiked(false);
        setIdLike(0);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        const userAPI = mapUsertoUserAPi(currentUser);
        const ressourceAPI = await mapRessourcetoRessourceAPI(ressource);

        const next: any = await apiSetLike({
          dateAdorer: new Date().toISOString(),
          id_utilisateur: userAPI.id,
          id_resource: ressourceAPI.id,
        });

        setLiked(true);
        setIdLike(next?.id ?? 0);
        setLikeCount((prev) => prev + 1);
      }
    } catch (e) {
      console.log("Erreur like :", e);
    }
  }

  // Fonction favoris
  async function handleToggleFavoris() {
    if (!ressource) return;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      if (favoris) {
        if (!idFavoris) return;

        await apiRemoveFavoris(idFavoris);

        setFavoris(false);
        setIdFavoris(0);
      } else {
        const userAPI = mapUsertoUserAPi(currentUser);
        const ressourceAPI = await mapRessourcetoRessourceAPI(ressource);

        const next: any = await apiSetFavoris({
          id_utilisateur: userAPI.id,
          id_resource: ressourceAPI.id,
        });

        setFavoris(true);
        setIdFavoris(next?.id ?? 0);
      }
    } catch (e) {
      console.log("Erreur favoris :", e);
    }
  }

  // Fonction consultation
  async function handleSetConsultation(ressourceLoaded: Ressource) {
    try {
      const currentUser = await getCurrentUser();
      const userAPI = currentUser ? mapUsertoUserAPi(currentUser) : null;

      const ressourceAPI = await mapRessourcetoRessourceAPI(ressourceLoaded);

      await apiSetConsultation({
        id_utilisateur: userAPI?.id ||null,
        id_resource: ressourceAPI.id, 
      });

      setViews((prev) => prev + 1);
    } catch (e) {
      console.log("Erreur consultation :", e);
    }
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


//fonction commentaire 
function handleCommentaireAdded(commentaire: Commentaire) {
  setCommentaires((prev) => [commentaire, ...prev]);
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