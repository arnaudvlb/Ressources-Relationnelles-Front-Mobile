import { Ressource } from "@/types/ressources";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

type Props = {
    canEdit : boolean,
    styles : any, 
    ressource : Ressource,

}

export default function RessourceUpdate({canEdit,styles,ressource}:Readonly<Props>){
    if (!canEdit) return null; 

    return(
  <Pressable
    onPress={() =>
      router.push({
        pathname: "/ressources/edit/[id]",
        params: { id: String(ressource.id_ressource) },
      })
    }
    style={styles.button}
  >
    <Text style={styles.buttonText}>Modifier la ressource</Text>
  </Pressable>
    )
}