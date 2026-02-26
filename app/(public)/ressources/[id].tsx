import RessourceEmpty from "@/components/ressources/ressourcesDetails/RessourceEmpty";
import RessourceHeader from "@/components/ressources/ressourcesDetails/RessourceHeader";
import RessourceMedia from "@/components/ressources/ressourcesDetails/RessourceMedia";
import RessourceStats from "@/components/ressources/ressourcesDetails/RessourceStats";
import { Colors } from "@/constants/theme";
import { listRessources } from "@/data/mockRessources";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { incrementRessourceViews, toggleRessourcesFavorite, toggleRessourcesLikes } from "@/services/ressourcesStatsStorage";
import { makeRessourceDetailStyles } from "@/styles/ressourceDetailStyles";
import { Text } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RessourceDetail(){

    //recuperation du theme *
    const scheme = useColorScheme()??"dark";
    const colors = Colors[scheme];
    const styles = makeRessourceDetailStyles(colors);
    

    //Recuperation des paramettre
    const params = useLocalSearchParams();

    const id = Number(params.id);

    //Recherche de la ressources, A changer avec api
    const ressource=useMemo(()=>{
        const all = listRessources();
        return all.find((r)=>r.id_ressource===id)
    },[id]);

    //Stare
    const [views,setViews]=useState(0);
    const [likeCount,setLikeCount]= useState(0);
    const [liked,setLiked]=useState(false);
    const [favorisCount,setFavorisCount]=useState(0);
    const [favoris,setFavoris]=useState(false);

    //Chargement de la page 
    useEffect(()=>{
        (async()=>{

            //Incrementation du nombre de vie 
            const next = await incrementRessourceViews(id);

            //state locaux
            setViews(next.views);
            setLikeCount(next.likesCount);
            setFavorisCount(next.favoriteCount);
            setLiked(next.liked);
            setFavoris(next.favorite);

    })();
    },[id]);


    //Quand l'utilisateur like 
    async function handleToggleLike(){
        const next = await toggleRessourcesLikes(id);

        setLikeCount(next.likesCount);
        setLiked(next.liked);
        
    }

    //Mettre la ressource  en favoris
    async function handleToggleFavoris() {
        const next = await toggleRessourcesFavorite(id);

        setFavorisCount(next.favoriteCount);
        setFavoris(next.favorite)
        
    }

    //si le media est une image
   


    

    //Si la ressources n'a pas ete trouve
    if(!ressource){
        return(
            <SafeAreaView style = {styles.screen}>
               <RessourceEmpty
               styles={styles}
               title="Ressource Introuvable"
               empty={`Impossible de trouver la ressource #${String(params.id)}`}
               buttonText="Retour"
               >

               </RessourceEmpty>
            </SafeAreaView>
        )
    }

    //formatage des données 
    const datetext = ressource.date_creation ? String(ressource.date_creation).slice(0,10):"-";
    const medias = (ressource as any).medias ?? []

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={{gap : 12,paddingBottom:24}}>
                <RessourceHeader
                styles={styles}
                ressource={ressource}
                >
                </RessourceHeader>

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
               >


               </RessourceStats>

                <RessourceMedia
                styles={styles}
                colors={colors}
                medias={medias}
                >

                </RessourceMedia>

                    <Pressable onPress={()=> router.back()} style={styles.button}>
                        <Text style={styles.buttonText}>Retour à la liste</Text>
                    </Pressable>

            </ScrollView>
        </SafeAreaView>
    )
}