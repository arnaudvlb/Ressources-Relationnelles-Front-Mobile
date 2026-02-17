import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeResourcesListStyles } from "@/styles/ressourcesListStyles";
import type { Ressource } from "@/types/ressources";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ LOCAL : on récupère les ressources depuis les mocks
import { listRessources } from "@/data/mockRessources";

/* ===========================
   💤 API (DÉSACTIVÉ)
   Quand l'API sera OK, tu pourras :
   1) décommenter l'import fetchRessources
   2) décommenter le useEffect API
   3) commenter le useEffect LOCAL
=========================== */

// import { ActivityIndicator } from "react-native";
// import { fetchRessources } from "@/services/resourcesApi";

export default function RessourcesList() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeResourcesListStyles(colors);

  const [ressources, setRessources] = useState<Ressource[]>([]);

  /* ===========================
     ✅ LOCAL (ACTIF)
     Charge les données depuis les mocks
  =========================== */
  useEffect(() => {
    const data = listRessources();
    setRessources(data);
  }, []);

  /* ===========================
     💤 API (DÉSACTIVÉ)
     Charge les données depuis l'API
  =========================== */
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const data = await fetchRessources();
  //       setRessources(data);
  //     } catch (e: any) {
  //       setError(e.message ?? "Impossible de charger les ressources.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  function renderItem({ item }: { item: Ressource }) {
    const dateText = item.date_creation ? String(item.date_creation).slice(0, 10) : "-";

    return (
      <Pressable onPress={() => {}} style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.titleText}>{item.titre}</Text>

          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: item.type.couleur }]}>
              {item.type.libelle}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Par {item.auteur.pseudo}</Text>
          <Text style={styles.metaText}>{dateText}</Text>

          {item.categorie ? (
            <View style={styles.badge}>
              <Text style={[styles.badgeText, { color: item.categorie.couleur }]}>
                {item.categorie.libelle}
              </Text>
            </View>
          ) : null}

          <Text style={styles.metaText}>❤️ {item.adore_count}</Text>
        </View>

        <View style={styles.tagsRow}>
          {item.tags.map((t) => (
            <View key={t.id_tag} style={styles.tag}>
              <Text style={[styles.tagText, { color: t.couleur }]}>
                #{t.libelle}
              </Text>
            </View>
          ))}
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Ressources</Text>

      {/* ✅ LOCAL : on peut indiquer “Local” si tu veux */}
      <Text style={styles.subtitle}>Liste des ressources (Local)</Text>

      {/* 💤 API (DÉSACTIVÉ) : loader + erreur */}
      {/* {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.empty}>{error}</Text>
      ) : ( */}

      <FlatList
        data={ressources}
        keyExtractor={(item) => String(item.id_ressource)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Aucune ressource disponible</Text>}
      />

      {/* )} */}
    </SafeAreaView>
  );
}