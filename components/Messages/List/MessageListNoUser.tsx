import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    styles : any , 
}


export default function MessageListNoUser({styles}:Readonly<Props>){

    return(
         <SafeAreaView style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}>Messagerie</Text>
    
                <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Connexion nécessaire</Text>
    
                <Text style={styles.muted}>
                    Connecte-toi pour accéder à tes messages.
                </Text>
                </View>
            </View>
            </SafeAreaView>
    )
}