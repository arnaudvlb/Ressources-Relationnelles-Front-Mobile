import { makeResourcesListStyles } from "@/components/ressources/module.RessourcesList.style";
import { Colors } from "@/constants/theme";
import { apiListCategories, apiListTags } from "@/services/FiltresApi";
import { apiListRessources } from "@/services/resourcesApi";
import { Categorie } from "@/types/categories";
import { Ressource } from "@/types/ressources";
import { Tag } from "@/types/tags";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RessourceCard } from "./RessourceCard";
import RessourcesFilters from "./RessourcesFiltres";
import RessourcesListHeader from "./RessourcesListHeader";

export default function RessourcesListe() {

  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeResourcesListStyles(colors);

  const [ressources, setRessources] = useState<Ressource[]>([]);
  
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [statsMap, setStatsMap] = useState<Record<string, { views: number; likesCount: number }> >({});


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedCategorieId, setSelectedCategorieId] = useState<string | null>(null)
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);


  const loadFilters = async () => {
    try {
     
      const [ categoriesList, tagsList] = await Promise.all([
      
        apiListCategories(),
        apiListTags(),
      ]);

    
      setCategories(categoriesList);
      setTags(tagsList);

    } catch (e : any) {
      setError(e?.message ??"Erreur lors du chargement des filtres")
    
      console.log(" Erreur lors du chargement des filtres :", e);
    }
  };

 
  const loadRessources = useCallback(async () => {
    try {

      setLoading(true);
      setError(null);

      const list = await apiListRessources({
        search,
        typeId: selectedTypeId,
        categorieId: selectedCategorieId,
        tagIds: selectedTagIds,
      });

      setRessources(list);

  
      const map: Record<string, { views: number; likesCount: number }> = {};

      list.forEach((r) => {
        map[String(r.id_ressource)] = {
          views: r.viewsCount ?? 0,
          likesCount: r.likeCount ?? 0,
        };
      });


      setStatsMap(map);
    } catch (e: any) {
    
      setError(e?.message ?? "Impossible de charger les ressources.");
    } finally {
      setLoading(false);
    }
  }, [search, selectedTypeId, selectedCategorieId, selectedTagIds]);

  
  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {

    const timeout = setTimeout(() => {
      loadRessources();
    }, 400);

    
    return () => clearTimeout(timeout);
  }, [search, selectedTypeId, selectedCategorieId, selectedTagIds, loadRessources]);

 
  const toggleTag = (id: string) => {
    setSelectedTagIds((currentTags) => {
      if (currentTags.includes(id)) {
        return currentTags.filter((tagId) => tagId !== id);
      }

      return [...currentTags, id];
    });
  };

  
  const resetFilters = () => {
    setSearch("");
    setSelectedTypeId(null);
    setSelectedCategorieId(null);
    setSelectedTagIds([]);
  };

 
  function renderItem({ item }: { item: Ressource }) {
    return (
      <RessourceCard
        styles={styles}
        item={item}
        statsMap={statsMap}
        colors={colors}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
  
      <RessourcesListHeader
        styles={styles}
        title="Ressources"
        subtitle="Liste des ressources disponibles"
      />

     <Pressable
      onPress={() => router.push("/ressources/add")}
      style={styles.addButton}
    >
      <Text style={styles.addButtonText}>Ajouter une ressource</Text>
    </Pressable>
      <RessourcesFilters
        styles={styles}
        colors={colors}
        search={search}
        selectedTypeId={selectedTypeId}
        selectedCategorieId={selectedCategorieId}
        selectedTagIds={selectedTagIds}
    
        categories={categories.map((categorie) => ({
          id: String(categorie.id ?? categorie.id),
          label: categorie.libelle,
        }))}
        tags={tags.map((tag) => ({
          id: String(tag.id_tag),
          label: tag.libelle,
        }))}
        
        onSearchChange={setSearch}
        onTypeChange={setSelectedTypeId}
        onCategorieChange={setSelectedCategorieId}
        onToggleTag={toggleTag}
        onReset={resetFilters}
      />

      {loading && <Text style={styles.empty}>Chargement des ressources...</Text>}

      {error && <Text style={styles.empty}>{error}</Text>}

  
      {!loading && !error && (
        <FlatList
          data={ressources}
          keyExtractor={(item) => String(item.id_ressource)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucune ressource disponible</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}