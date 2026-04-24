import RessourceEmpty from "@/components/ressources/ressourcesDetails/RessourceEmpty";
import RessourceHeader from "@/components/ressources/ressourcesDetails/RessourceHeader";
import RessourceMedia from "@/components/ressources/ressourcesDetails/RessourceMedia";
import RessourceStats from "@/components/ressources/ressourcesDetails/RessourceStats";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { mapRessourcetoRessourceAPI } from "@/mappers/ressourceMapper";
import { mapUsertoUserAPi } from "@/mappers/userMapper";
import { apiGetRessource } from "@/services/resourcesApi";
import { apiRemoveFavoris, apiRemoveLike, apiSetConsultation, apiSetFavoris, apiSetLike } from "@/services/statsApi";
import { getCurrentUser } from "@/services/userStorage";
import { makeRessourceDetailStyles } from "@/styles/ressourceDetailStyles";
import { Ressource } from "@/types/ressources";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  id: number;
}


export default function RessourceDetail({id}:Props) {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeRessourceDetailStyles(colors);



  // Stats
  const [views, setViews] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  const [liked, setLiked] = useState(false);
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

        if (!ressource){
          handleToggleConsultation()
        }


      } catch (e: any) {
        setError(e?.message ?? "Impossible de charger la ressource.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  //Verifier si l'utilisateur a deja liker la ressources

  async function handleToggleLike() {
    if (!ressource) return;

    if (ressource?.isLike){
      const next = await apiRemoveLike(ressource.idLike)

    }else {
      const currentUser = await getCurrentUser()
      if (!currentUser) return; 

      const userAPI=mapUsertoUserAPi(currentUser) ;
      const ressourceAPI= await mapRessourcetoRessourceAPI(ressource);

      const next= await apiSetLike({dateAdorer: String(new Date()),utilisateur:userAPI, resource:ressourceAPI })


    }

  }


//fonction favoris
  async function handleToggleFavoris() {
    if (!ressource) return;

    if (ressource?.isLike){
      const next = await apiRemoveFavoris(ressource.idLike)

    }else {
      const currentUser = await getCurrentUser()
      if (!currentUser) return; 

      const userAPI=mapUsertoUserAPi(currentUser) ;
      const ressourceAPI= await mapRessourcetoRessourceAPI(ressource);

      const next= await apiSetFavoris({utilisateur:userAPI, resource:ressourceAPI })


    }

  }


//Fonction vues 
  async function handleToggleConsultation() {
    if (!ressource) return;

    if (ressource?.isLike){
      // TODO: handle if already consulted
    }else {
      const currentUser = await getCurrentUser()
      const userAPI = currentUser ? mapUsertoUserAPi(currentUser): null;

      const ressourceAPI= await mapRessourcetoRessourceAPI(ressource);

      const next= await apiSetConsultation({utilisateur:userAPI, resource:ressourceAPI })


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

  
  if (!ressource) {
    return (
      <SafeAreaView style={styles.screen}>
        <RessourceEmpty
          styles={styles}
          title="Ressource Introuvable"
          empty={`Impossible de trouver la ressource #${String(id)}`}
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