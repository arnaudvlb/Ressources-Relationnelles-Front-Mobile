import RessourceDetail from "@/screen/ressources/RessourcesDetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const params = useLocalSearchParams();
  const id = Number(params.id);

  return <RessourceDetail id={id} />;
}