import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeHomePublicStyles } from "@/styles/homePublicStyles";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // Récupération du thème actuel
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomePublicStyles(colors);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
      
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

    
        <Text style={styles.title}>(RE)Sources Relationnelles</Text>

     
        <Text style={styles.slogan}>
          Des ressources pour mieux comprendre, construire et enrichir vos relations.
        </Text>

       
        <Text style={styles.description}>
          La plateforme propose des outils et contenus pour accompagner chacun dans
          la qualité de ses liens relationnels : famille, couple, amis, collègues
          ou entourage du quotidien.
        </Text>

      
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/ressources")}
        >
          <Text style={styles.buttonText}>Découvrir les ressources</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}