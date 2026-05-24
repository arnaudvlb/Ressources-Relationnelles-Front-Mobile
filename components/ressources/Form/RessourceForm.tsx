
import { AppInput } from "@/components/AppInput";
import { getUserId } from "@/config/format";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import {
    apiCreateRessource,
    apiUpdateRessource,
} from "@/services/resourcesApi";

import { mapUsertoUserAPi } from "@/mappers/userMapper";
import { apiListCategories, apiListTags } from "@/services/FiltresApi";
import { getCurrentUser } from "@/services/userStorage";
import { Categorie } from "@/types/categories";
import { Ressource } from "@/types/ressources";
import { Tag } from "@/types/tags";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeRessourceFormStyles } from "./module.ressourceForm.styles";
import RessourcesFormLoading from "./RessourceFormLoading";


type Props = {
  mode: "create" | "edit";
  ressource?: Ressource | null;
};

const VISIBILITES = [
  { id: "public", libelle: "Public" },
  { id: "prive", libelle: "Privé" },
  { id: "amis", libelle: "Amis uniquement" },
];

export default function RessourceForm({ mode, ressource }: Readonly<Props>) {

  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme];
  const styles = makeRessourceFormStyles(colors);

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [visibilite, setVisibilite] = useState("public");
  const [categorieId, setCategorieId] = useState<number | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [estVisible, setEstVisible] = useState(true);

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {

    if (mode === "edit" && ressource) {
      setTitre(ressource.titre ?? "");
      setContenu(ressource.contenu ?? "");
      setVisibilite(ressource.visibilite ?? "public");
      setEstVisible(ressource.active ?? true);

      const firstCategorie = Array.isArray(ressource.categorie)
        ? ressource.categorie[0]
        : ressource.categorie;

      setCategorieId(firstCategorie?.id ?? null);

      const tagIds = ressource.tags?.map((tag: any) => tag.id) ?? [];
      setSelectedTagIds(tagIds);
    }
  }, [mode, ressource]);

  async function loadOptions() {
    try {
      setLoadingOptions(true);

      const categoriesResponse: any = await apiListCategories();
      const tagsResponse: any = await apiListTags();

      const allCategories: Categorie[] = Array.isArray(categoriesResponse)
        ? categoriesResponse
        : categoriesResponse.member ?? [];

      const allTags: Tag[] = Array.isArray(tagsResponse)
        ? tagsResponse
        : tagsResponse.member ?? [];

      setCategories(allCategories);
      setTags(allTags);
    } catch (error) {
      console.log("Erreur chargement catégories/tags :", error);

      Alert.alert(
        "Erreur",
        "Impossible de récupérer les catégories et les tags."
      );
    } finally {
      setLoadingOptions(false);
    }
  }

  

  function toggleTag(tagId: number) {
    setSelectedTagIds((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }

      return [...prev, tagId];
    });
  }

  async function handleSubmit() {
    const cleanTitre = titre.trim();
    const cleanContenu = contenu.trim();

    if (!cleanTitre || !cleanContenu) {
      Alert.alert("Erreur", "Le titre et le contenu sont obligatoires.");
      return;
    }

    if (!categorieId) {
      Alert.alert("Erreur", "Merci de sélectionner une catégorie.");
      return;
    }

    const currentUser = await getCurrentUser();
    const userId = getUserId(currentUser);

    if (!userId) {
      Alert.alert("Erreur", "Utilisateur connecté introuvable.");
      return;
    }

    if (!currentUser){
        Alert.alert("Erreur", "Utilisateur connecté introuvable.");
      return;
    }
    const UserAPi = mapUsertoUserAPi(currentUser)
    const payload = {
      titre: cleanTitre,
      contenu: cleanContenu,
      valide: mode === "edit" ? ressource?.valide ?? false : false,
      estVisible,
      dateCreation: ressource?.date_creation ?? new Date().toISOString(),
      visibilite,
      utilisateur: UserAPi,
      categories: `/api/categories/${categorieId}`,
      tagsRessources: selectedTagIds.map((id) => `/api/tags/${id}`),
      medias: [],
    };

    console.log("Payload ressource envoyé :", payload);

    try {
      setSaving(true);

      if (mode === "edit" && ressource?.id_ressource) {
        await apiUpdateRessource(ressource.id_ressource, payload);

        Alert.alert("Succès", "La ressource a bien été modifiée.");
      } else {
        await apiCreateRessource(payload);

        Alert.alert("Succès", "La ressource a bien été créée.");
      }

      router.push("/ressources");
    } catch (error: any) {
      console.log("Erreur sauvegarde ressource :", error);

      Alert.alert(
        "Erreur",
        error?.message ?? "Impossible d'enregistrer la ressource."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingOptions) {
    return (
     <RessourcesFormLoading 
     styles={styles}
     mode={mode}
     />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {mode === "edit" ? "Modifier la ressource" : "Ajouter une ressource"}
        </Text>

        <Text style={styles.subtitle}>
          Renseignez les informations principales de la ressource.
        </Text>

        <View style={styles.card}>
          <AppInput
            label="Titre"
            value={titre}
            onChangeText={setTitre}
            placeholder="Ex : Guide Symfony"
          />

          <AppInput
            label="Contenu"
            value={contenu}
            onChangeText={setContenu}
            placeholder="Décrivez la ressource..."
          />

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Visibilité</Text>

            <View style={styles.optionsWrap}>
              {VISIBILITES.map((item) => {
                const selected = visibilite === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setVisibilite(item.id)}
                    style={[
                      styles.optionButton,
                      selected && styles.optionButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {item.libelle}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Catégorie</Text>

            {categories.length === 0 ? (
              <Text style={styles.emptyText}>Aucune catégorie disponible.</Text>
            ) : (
              <View style={styles.optionsWrap}>
                {categories.map((categorie) => {
                  const selected = categorieId === categorie.id;

                  return (
                    <Pressable
                      key={categorie.id}
                      onPress={() => setCategorieId(categorie.id)}
                      style={[
                        styles.optionButton,
                        selected && styles.optionButtonSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {categorie.libelle}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tags</Text>

            {tags.length === 0 ? (
              <Text style={styles.emptyText}>Aucun tag disponible.</Text>
            ) : (
              <View style={styles.optionsWrap}>
                {tags.map((tag) => {
                  const selected = selectedTagIds.includes(tag.id_tag);

                  return (
                    <Pressable
                      key={tag.id_tag}
                      onPress={() => toggleTag(tag.id_tag)}
                      style={[
                        styles.optionButton,
                        selected && styles.optionButtonSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {tag.libelle}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          <Pressable
            onPress={() => setEstVisible((prev) => !prev)}
            style={[
              styles.visibilityButton,
              estVisible && styles.visibilityButtonActive,
            ]}
          >
            <Text style={styles.visibilityText}>
              {estVisible ? "Ressource visible" : "Ressource masquée"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            disabled={saving}
            style={[styles.submitButton, saving && styles.disabledButton]}
          >
            <Text style={styles.submitText}>
              {saving
                ? "Enregistrement..."
                : mode === "edit"
                ? "Modifier"
                : "Créer"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}