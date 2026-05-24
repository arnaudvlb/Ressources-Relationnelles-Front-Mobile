import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


type Props = {
    styles : any , 
}



export default function MessageDetailNoOtherUser({styles}:Readonly<Props>){

    return(
         <SafeAreaView style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}>Conversation introuvable</Text>
                <Text style={styles.muted}>
                Impossible de retrouver cet utilisateur.
                </Text>
            </View>
            </SafeAreaView>
    )
}