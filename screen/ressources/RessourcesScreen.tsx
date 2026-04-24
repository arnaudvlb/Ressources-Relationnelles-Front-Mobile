
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { makeResourcesListStyles } from "@/styles/ressourcesListStyles";
import type { Ressource } from "@/types/ressources";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RessourceCard } from "@/components/ressources/RessourceCard";
import RessourcesListHeader from "@/components/ressources/RessourcesListHeader";
import { apiListRessources } from "@/services/resourcesApi";


export default function RessourcesScreen() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeResourcesListStyles(colors);

  const [ressources, setRessources] = useState<Ressource[]>([]);
  //A changer, utilisation sans api 
  const [statsMap, setStatsMap] = useState<Record<string, { views: number; likesCount: number }>>({});



  //API 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
//Chargement des ressources
useEffect(() => {
  const loadRessources = async () => {
    try {
      setLoading(true);
      setError(null);

      const list = await apiListRessources();
      setRessources(list);

      const map: Record<string, { views: number; likesCount: number }> = {};
      list.forEach((r) => {
          map[String(r.id_ressource)] = { views: r.viewsCount ?? 0, likesCount: r.likeCount ?? 0 };
       });

       //En trop a enlever / a changer 
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
      subtitle="Liste des test"
      >
        
      </RessourcesListHeader>

      {loading && <Text style={styles.empty}>Chargement des ressources...</Text>}
      {error && <Text style={styles.empty}>{error}</Text>}



      {!loading && !error && (
      <FlatList
        data={ressources}
        keyExtractor={(item) => String(item.id_ressource)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Aucune ressource disponible</Text>}
      />
      )}


    </SafeAreaView>
  );
}