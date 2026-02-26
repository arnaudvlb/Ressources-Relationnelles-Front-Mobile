import { Ressource } from "@/types/ressources";
import { Text, View } from "react-native";


type Props={
    styles:any,
    ressource:Ressource,
}
export default function RessourceHeader({ styles, ressource }: Readonly<Props>) {
  const categorie = ressource.categorie ?? null;

  return (
    <View style={styles.headerRow}>
      <Text style={styles.title}>{ressource.titre}</Text>

      {categorie ? (
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color: categorie.couleur }]}>
            {categorie.libelle}
          </Text>
        </View>
      ) : null}
    </View>
  );
}