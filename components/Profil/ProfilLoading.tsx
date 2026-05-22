import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Props = {
    styles : any 
}


export default function ProfilLoading({styles}:Readonly<Props>){

    return(
        <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Mon compte</Text>
        <Text style={styles.muted}>Chargement…</Text>
      </SafeAreaView>
    )
}