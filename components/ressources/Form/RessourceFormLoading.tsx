import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type Props = {
    styles : any,
    mode :string, 
}
export default function RessourcesFormLoading({styles,mode}:Readonly<Props> ){

    return(

         <SafeAreaView style={styles.screen}>
        <View style={styles.content}>
            <Text style={styles.title}>
            {mode === "edit" ? "Modifier la ressource" : "Ajouter une ressource"}
            </Text>

            <Text style={styles.subtitle}>
            Chargement des catégories et des tags...
            </Text>
        </View>
        </SafeAreaView>
    )
}