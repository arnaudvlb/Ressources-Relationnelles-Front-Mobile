
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeHomePublicStyles } from "@/styles/homePublicStyles";
import { Text, View } from "react-native";

export default function Home(){
  //Theme
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomePublicStyles(colors);

   return (
    // Conteneur principal avec le style séparé
    <View style={styles.screen}>
      {/* Texte principal */}
      <Text style={styles.title}>Bienvenue 👋</Text>

      {/* Petit texte secondaire */}
      <Text style={styles.subtitle}>
        Pour l’instant, on met juste la navigation entre Accueil, Connexion et Compte.
      </Text>
    </View>
  );
}

