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
        
        
                <Text style={styles.content}>{ressource.contenu}</Text>
        
                <View style={styles.actionsRow}>

                {/* LIKE */}
                <Pressable
                
                    onPress={handleActionLike}
                    style={[
                    styles.actionBtn,
                    liked && styles.actionBtnActiveLike
                    ]}
                >
                    <Text
                    style={[
                        styles.actionText,
                        liked && styles.actionTextActiveLike
                    ]}
                    >
                    ❤️ {likeCount}
                    </Text>
                </Pressable>

                {/* FAVORIS */}
                <Pressable
                    onPress={handleActionFavoris}
                    style={[
                    styles.actionBtn,
                    favoris && styles.actionBtnActiveFav
                    ]}
                >
                    <Text
                    style={[
                        styles.actionText,
                        favoris && styles.actionTextActiveFav
                    ]}
                    >
                    ⭐ 
                    </Text>
                </Pressable>

</View>
                </View>
            </View>
        
    )
}