import { Text, View } from "react-native"

type Props = {
    styles : any , 
}

export default function MessageListEmpty({styles}:Readonly<Props>){

    return(
        <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>Aucune conversation</Text>

        <Text style={styles.muted}>
            Vous n’avez pas encore échangé de message avec un autre utilisateur.
        </Text>
        </View>
    )
}