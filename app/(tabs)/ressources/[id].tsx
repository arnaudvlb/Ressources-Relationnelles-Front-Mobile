import RessourceDetail from "@/screen/ressources/RessourcesDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const params = useLocalSearchParams();
  const id = Number(params.id);

  // Pas besoin de parenthèses après RessourceDetail, 
  // on l'utilise comme une balise
  return <RessourceDetail id={id} />;
}