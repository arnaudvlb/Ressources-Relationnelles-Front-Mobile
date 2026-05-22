import { Text, View } from "react-native";

type Props ={
    styles : any 
}

export default function AmisEmpty({styles}:Readonly<Props>){
    return(
        <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>Aucun utilisateur disponible</Text>

        <Text style={styles.muted}>
            Tous les utilisateurs disponibles sont déjà dans ta liste d’amis,
            ou aucun autre utilisateur n’est encore inscrit.
        </Text>
        </View>
    )
}