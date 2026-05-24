
import RessourceForm from "@/components/ressources/Form/RessourceForm";
import { apiGetRessource } from "@/services/resourcesApi";
import { Ressource } from "@/types/ressources";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditRessourcePage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [ressource, setRessource] = useState<Ressource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRessource();
  }, [id]);

  async function loadRessource() {
    try {
      const ressourceLoaded = await apiGetRessource(Number(id));
      setRessource(ressourceLoaded);
    } catch (error) {
      console.log("Erreur chargement ressource edit :", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Chargement...</Text>
      </SafeAreaView>
    );
  }

  if (!ressource) {
    return (
      <SafeAreaView>
        <Text>Ressource introuvable.</Text>
      </SafeAreaView>
    );
  }

  return <RessourceForm mode="edit" ressource={ressource} />;
}