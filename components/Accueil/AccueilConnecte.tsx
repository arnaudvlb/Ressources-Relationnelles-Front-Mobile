import { Colors } from "@/constants/theme";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, useColorScheme, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';
import { makeHomeConnectedStyles } from "./module.HomeConnected.style";


export default function AccueilConnecte(){

     // Récupération du thème actuel
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeHomeConnectedStyles(colors);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
       
        <View style={styles.header}>
          <Text style={styles.hello}>Bonjour 👋</Text>

          <Text style={styles.title}>
            Bienvenue sur (RE)Sources Relationnelles
          </Text>

          <Text style={styles.subtitle}>
            Retrouvez vos ressources, explorez de nouveaux contenus et avancez
            à votre rythme vers des relations plus riches et plus équilibrées.
          </Text>
        </View>

       
        <View style={styles.mainCard}>
          <Text style={styles.cardLabel}>À découvrir</Text>

          <Text style={styles.cardTitle}>Explorer les ressources</Text>

          <Text style={styles.cardText}>
            Accédez aux contenus disponibles pour mieux comprendre les liens
            relationnels, renforcer la communication et enrichir vos relations
            du quotidien.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/ressources")}
          >
            <Text style={styles.primaryButtonText}>Voir les ressources</Text>
          </Pressable>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accès rapide</Text>

          <View style={styles.quickActions}>
            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                pressed && styles.quickCardPressed,
              ]}
              onPress={() => router.push("/ressources")}
            >
              <Text style={styles.quickTitle}>Ressources</Text>
              <Text style={styles.quickText}>
                Consulter les contenus disponibles.
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.quickCard,
                pressed && styles.quickCardPressed,
              ]}
              onPress={() => router.push("/profile")}
            >
              <Text style={styles.quickTitle}>Mon compte</Text>
              <Text style={styles.quickText}>
                Voir ou modifier mes informations.
              </Text>
            </Pressable>
          </View>
        </View>

       
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            “Prendre soin de ses relations, c’est aussi prendre soin de sa
            qualité de vie.”
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

            )
}