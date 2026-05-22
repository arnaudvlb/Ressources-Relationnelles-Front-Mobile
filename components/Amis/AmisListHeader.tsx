import { Text, View } from "react-native";
type Props ={
    styles : any 
}
export default function AmisListHeader({styles}:Readonly<Props>){

    return(
         <View style={styles.header}>
        <Text style={styles.title}>Ajouter des amis</Text>

        <Text style={styles.subtitle}>
        Retrouvez les utilisateurs de la plateforme et ajoutez-les directement
        à votre liste d’amis.
        </Text>
    </View>
)
}