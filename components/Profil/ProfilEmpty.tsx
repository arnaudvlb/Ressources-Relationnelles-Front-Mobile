import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    styles : any 
}

export default function ProfilEmpty({styles}:Readonly<Props>){

    return(

         <SafeAreaView style={styles.screen}>
                <Text style={styles.title}>Mon compte</Text>
        
                <View style={styles.card}>
                  <Text style={styles.muted}>
                    Aucun utilisateur connecté. Connecte-toi pour accéder à ton profil.
                  </Text>
        
                  <Pressable
                    onPress={() => router.replace("/(public)/login")}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>Aller à la connexion</Text>
                  </Pressable>
                </View>
              </SafeAreaView>
    )
}