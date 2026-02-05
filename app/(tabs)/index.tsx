
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeHomePrivateStyles } from "@/styles/homePrivateStyles";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";


export default function Home() {

  // Récupération du thème actuel
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomePrivateStyles(colors);


  return (
   
    <View style={styles.screen}>

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
    </View>
  );
}