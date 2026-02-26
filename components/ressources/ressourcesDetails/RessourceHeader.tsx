import { Ressource } from "@/types/ressources";
import { Text, View } from "react-native";


type Props={
    styles:any,
    ressource:Ressource,
}
export default function RessourceHeader({styles,ressource}:Readonly<Props>){
    return(
        
        <View style={styles.headerRow}>
            <Text style={styles.title}>{ressource.titre}</Text>
        
            <View style={styles.badge}>
                <Text style={[styles.badgeText,{color :ressource.categorie.couleur}]}>{ressource.categorie.libelle}</Text>
            </View>
        </View>
        
    )
}