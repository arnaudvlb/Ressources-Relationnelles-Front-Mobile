import { Ressource } from "@/types/ressources";
import { Pressable, Text, View } from "react-native";

type Props={
    styles:any,
    ressource:Ressource,
    views:any,
    likeCount:any,
    datetext:string,
    handleActionLike:any,
    handleActionFavoris:any,
    favoris:boolean,
    liked:boolean,
}

export default function RessourceStats({styles,ressource,views,likeCount,datetext,handleActionLike,handleActionFavoris,favoris,liked}:Readonly<Props>){

    return(
        
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
        
                <Pressable onPress= {handleActionLike} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {liked ? "🤍":"❤️"}
                     </Text>
                </Pressable>
                
                <Pressable onPress = {handleActionFavoris} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {favoris ? "☆":"⭐" }
                    </Text>
                </Pressable>
                </View>
            </View>
        
    )
}