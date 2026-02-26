
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeResourcesListStyles } from "@/styles/ressourcesListStyles";
import type { Ressource } from "@/types/ressources";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// ✅ LOCAL : on récupère les ressources depuis les mocks

import { RessourceCard } from "@/components/ressources/RessourceCard";
import RessourcesListHeader from "@/components/ressources/RessourcesListHeader";
import { apiListRessources } from "@/services/resourcesApi";


export default function RessourcesList() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeResourcesListStyles(colors);

  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [statsMap, setStatsMap] = useState<Record<string, { views: number; likesCount: number }>>({});



  //API 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

useEffect(() => {
  const loadRessources = async () => {
    try {
      setLoading(true);
      setError(null);

      const list = await apiListRessources();
      setRessources(list);

      const map: Record<string, { views: number; likesCount: number }> = {};
      list.forEach((r: any) => {
        map[String(r.id)] = { views: r.views ?? 0, likesCount: r.likesCount ?? 0 };
      });
      setStatsMap(map);
    } catch (e: any) {
      setError(e?.message ?? "Impossible de charger les ressources.");
    } finally {
      setLoading(false);
    }
  };

  loadRessources();
}, []);




  function renderItem({ item }: { item: Ressource }) {
    return(
      
      <RessourceCard
      styles={styles}
      item={item}
      statsMap={statsMap}
      colors={colors}
      loading={loading}
      error={error}
      >

      </RessourceCard>
      
    );
  }

  return (
    <SafeAreaView style={styles.screen}>

      <RessourcesListHeader
      styles={styles}
      title="Ressources"
      subtitle="Liste des ressources"
      >
      </RessourcesListHeader>

      <FlatList
        data={ressources}
        keyExtractor={(item) => String(item.id_ressource)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Aucune ressource disponible</Text>}
      />

    </SafeAreaView>
  );
}