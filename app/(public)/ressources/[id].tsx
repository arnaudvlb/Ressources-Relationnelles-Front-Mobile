import RessourceEmpty from "@/components/ressources/ressourcesDetails/RessourceEmpty";
import RessourceHeader from "@/components/ressources/ressourcesDetails/RessourceHeader";
import RessourceMedia from "@/components/ressources/ressourcesDetails/RessourceMedia";
import RessourceStats from "@/components/ressources/ressourcesDetails/RessourceStats";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { apiGetRessource } from "@/services/resourcesApi";
import {
    incrementRessourceViews,
    toggleRessourcesFavorite,
    toggleRessourcesLikes,
} from "@/services/ressourcesStatsStorage";
import { makeRessourceDetailStyles } from "@/styles/ressourceDetailStyles";
import { Ressource } from "@/types/ressources";
import { Text } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RessourceDetail() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeRessourceDetailStyles(colors);

  const params = useLocalSearchParams();
  const id = Number(params.id);

  // Stats
  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorisCount, setFavorisCount] = useState(0);
  const [favoris, setFavoris] = useState(false);

  // API
  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        setRessource(null);

        const r = await apiGetRessource(id);
        setRessource(r);

        const next = await incrementRessourceViews(id);
        setViews(next.views);
        setLikeCount(next.likesCount);
        setFavorisCount(next.favoriteCount);
        setLiked(next.liked);
        setFavoris(next.favorite);
      } catch (e: any) {
        setError(e?.message ?? "Impossible de charger la ressource.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleToggleLike() {
    const next = await toggleRessourcesLikes(id);
    setLikeCount(next.likesCount);
    setLiked(next.liked);
  }

  async function handleToggleFavoris() {
    const next = await toggleRessourcesFavorite(id);
    setFavorisCount(next.favoriteCount);
    setFavoris(next.favorite);
  }

  // ✅ Loading
  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.empty}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  // ✅ Error
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

  // ✅ Not found
  if (!ressource) {
    return (
      <SafeAreaView style={styles.screen}>
        <RessourceEmpty
          styles={styles}
          title="Ressource Introuvable"
          empty={`Impossible de trouver la ressource #${String(params.id)}`}
          buttonText="Retour"
        />
      </SafeAreaView>
    );
  }

  const datetext = ressource.date_creation
    ? String(ressource.date_creation).slice(0, 10)
    : "-";

  const medias = (ressource as any).medias ?? [];

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

        <Pressable onPress={() => router.push("/ressources")} style={styles.button}>
          <Text style={styles.buttonText}>Retour à la liste</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}