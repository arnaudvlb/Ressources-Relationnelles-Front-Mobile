import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


type Props ={
    styles : any 
}

export default function AmisNoUser({styles}:Readonly<Props>){

    return(
    <SafeAreaView style={styles.screen}>
    <View style={styles.content}>
        <Text style={styles.title}>Ajouter des amis</Text>

        <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>Connexion nécessaire</Text>
        <Text style={styles.muted}>
            Connecte-toi pour voir les utilisateurs du site et ajouter des amis.
        </Text>
        </View>
    </View>
    </SafeAreaView>
    )
}