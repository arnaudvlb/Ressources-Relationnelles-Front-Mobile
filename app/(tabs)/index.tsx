<<<<<<< Updated upstream

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeHomePrivateStyles } from "@/styles/homePrivateStyles";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


=======
import AccueilConnecte from "@/components/Accueil/AccueilConnecte";
import { getAccessToken } from "@/services/authStorage";
import { getCurrentUser } from "@/services/userStorage";
import { router } from "expo-router";
import React, { useEffect } from "react";
>>>>>>> Stashed changes

export default function Home() {
  useEffect(() => {
    checkIfConnected();
  }, []);

<<<<<<< Updated upstream
  // Récupération du thème actuel
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomePrivateStyles(colors);


  return (
   
    <SafeAreaView style={styles.screen}>

      <Text style={styles.title}>Accueil</Text>
      <Text style={styles.subtitle}>
        Ceci est la Home privée (dans les tabs). Ici on mettra plus tard les fonctions principales de l’app.
      </Text>

      <View style={styles.card}>
        <Pressable
          onPress={() => {}}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Action principale (à définir)</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(tabs)/profile")}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Aller au profil</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
=======
  async function checkIfConnected() {
    const token = await getAccessToken();
    const user = await getCurrentUser();

    if (token && user) {
      router.replace("/(tabs)");
    }
  }

  return <AccueilConnecte />;
>>>>>>> Stashed changes
}