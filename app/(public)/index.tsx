
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeHomePublicStyles } from "@/styles/homePublicStyles";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
  //Theme
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomePublicStyles(colors);

   return (
    // Conteneur principal avec le style séparé
    <SafeAreaView style={styles.screen}>
      {/* Texte principal */}
      <Text style={styles.title}>Bienvenue 👋</Text>

      {/* Petit texte secondaire */}
      <Text style={styles.subtitle}>
        Pour l’instant, on met juste la navigation entre Accueil, Connexion et Compte.
      </Text>

      <Pressable onPress={() => router.push("/ressources")}>
       <Text>Aller aux ressources</Text>
      </Pressable>
    </SafeAreaView>

    
  );

  
}

