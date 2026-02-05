import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { removeAccessToken } from "@/services/authStorage";
import { makeProfileStyles } from "@/styles/profileStyles";
import { router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";


export default function Profile()  {

    //Definition du theme
    const scheme = useColorScheme()?? "dark";
    const colors = Colors[scheme];
    const styles = makeProfileStyles(colors);

    //Fonction de deconnexion
    async function doLogout() {

        //Supprimer le token d'acces
        await removeAccessToken();

        //Redirection sur la page de login
        router.replace("/login");
        
    }

    //Fonction bouton deconnexion
    function handleLogout(){
    Alert.alert(
      "Déconnexion",
      "Es-tu sûr(e) de vouloir te déconnecter ?",
      [
        // Bouton annuler : aucune action
        { text: "Annuler", style: "cancel" },

        // Bouton confirmer : lance la déconnexion
        { text: "Se déconnecter", style: "destructive", onPress: doLogout },
      ]
    );
  }


  return(
    <View style={styles.screen}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
             <Text style={styles.muted}>Cette page affichera les informations du compte lorsque l’API sera disponible.</Text>

             <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Se déconnecter</Text>
             </Pressable>
        </View>
    </View>
  )
}
