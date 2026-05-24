import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


type Props = {
    styles : any , 
}

export default function MessageListLoading({styles}:Readonly<Props>){

    return(
        <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
          <Text style={styles.title}>Messagerie</Text>
          <Text style={styles.muted}>Chargement des conversations…</Text>
        </View>
      </SafeAreaView>
    )
}