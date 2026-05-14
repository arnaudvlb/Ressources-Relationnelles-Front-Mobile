import RessourceDetail from "@/components/ressources/ressourcesDetails/RessourceDetail";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function RessourcesDetailScreen() {
  const { id } = useLocalSearchParams();

  const ressourceId = Number(id);

  if (!id || Number.isNaN(ressourceId)) {
    return <Text>Ressource introuvable</Text>;
  }

  return <RessourceDetail id={ressourceId} />;
}