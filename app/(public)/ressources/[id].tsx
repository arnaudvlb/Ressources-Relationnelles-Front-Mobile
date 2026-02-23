import { Colors } from "@/constants/theme";
import { listRessources } from "@/data/mockRessources";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { incrementRessourceViews, toggleRessourcesFavorite, toggleRessourcesLikes } from "@/services/ressourcesStatsStorage";
import { makeRessourceDetailStyles } from "@/styles/ressourceDetailStyles";
import { Text } from "@react-navigation/elements";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";
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
    function isImage(url:string){
        return /\.(png|jpg|jpeg|webp)$/i.test(url);
    }


    function isPDF(url:string){
        return /\.pdf$/i.test(url);
    }

    //Si la ressources n'a pas ete trouve
    if(!ressource){
        return(
            <SafeAreaView style = {styles.screen}>
                <Text style={styles.title}>Ressource Introuvable</Text>
                <Text style={styles.empty}>Impossible de trouver la ressource #{String(params.id)}</Text>

                <Pressable onPress={()=> router.back()} style={styles.button}>
                    <Text style={styles.buttonText}>Retour</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    //formatage des données 
    const datetext = ressource.date_creation ? String(ressource.date_creation).slice(0,10):"-";
    const medias = (ressource as any).medias ?? []

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={{gap : 12,paddingBottom:24}}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{ressource.titre}</Text>

                    <View style={styles.badge}>
                        <Text style={[styles.badgeText,{color :ressource.type.couleur}]}>{ressource.type.libelle}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>Par {ressource.auteur.pseudo}</Text>
                        <Text style={styles.metaText}>{datetext}</Text>

                        {ressource.categorie ? (
                            <View style={styles.badge}>
                                <Text style={[styles.badgeText,{color : ressource.categorie.couleur}]}>{ressource.categorie.libelle}</Text>
                            </View>
                        ): null}

                        <Text style={styles.metaText}>👁{views}</Text>
                        <Text style={styles.metaText}>❤️{likeCount}</Text>

                        <Text style={styles.content}>{ressource.contenu}</Text>

                        <Pressable onPress= {handleToggleLike} style={styles.button}>
                            <Text style={styles.buttonText}>
                                {liked ? "🤍 Retirer l'adoration":"❤️ Adorer"}
                            </Text>
                        </Pressable>
                        <Pressable onPress = {handleToggleFavoris} style={styles.button}>
                            <Text style={styles.buttonText}>
                                {favoris ? "🔖 Enlever Favoris":"🔖 Favoris" }
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.metaText}>Médias</Text>
                        {medias.taille === 0 ?(
                            <Text style={styles.empty}>Aucun média pour cette ressource</Text>
                        ):(
                            <View style={{gap:12}}>
                                {medias.map((m:any)=>{
                                    
                                    const url = String(m.chemin_fichier ??"");
                                    const name=String(m.nom_fichier ??"Fichier");

                                    if (url && isImage(url)){
                                        return(
                                            <View key={String(m.id_media)} style={{gap:8}}>
                                                <Text style={styles.metaText}>{name}</Text>
                                              <Image
                                                source={{ uri: url }}
                                                style={{ width: "100%", height: 220, borderRadius: 18 }}
                                                resizeMode="cover"
                                            />

                                            </View>
                                        );
                                    }
                                    if(url){
                                        return(
                                            <View key={String(m.id_media)} style ={{gap:8}}>
                                                <Text style={styles.metaText}>{name}</Text>
                                                <Pressable 
                                                    onPress={()=>Linking.openURL(url)}
                                                    style={[styles.button,{backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}>
                                                    
                                                    <Text style={[styles.buttonText,{color:colors.text}]}>
                                                        {isPDF(url)?"Ouvrir le PDF" : "Ouvrir le lien"}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        )
                                    }
                                    return(
                                        <Text key={String(m.id_media)} style={styles.empty}>
                                            Média Invalide
                                        </Text>
                                    );
                                })}
                            </View>
                        )}
                    </View>

                    <Pressable onPress={()=> router.back()} style={styles.button}>
                        <Text style={styles.buttonText}>Retour à la liste</Text>
                    </Pressable>
                    
                    
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}