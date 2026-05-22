import { Ressource } from "@/types/ressources";
import { Text, View } from "react-native";

type Props = {
  styles: any;
  ressource: Ressource;
};

export default function RessourceHeader({ styles, ressource }: Readonly<Props>) {
  const categorieLibelle = ressource.categorie?.libelle;
  const categorieCouleur = ressource.categorie?.couleur;

  return (
    <View style={styles.headerRow}>
      <Text style={styles.title}>{ressource.titre}</Text>

      {categorieLibelle ? (
        <View style={styles.badge}>
          <Text
            style={[
              styles.badgeText,
              categorieCouleur ? { color: categorieCouleur } : null,
            ]}
          >
            {categorieLibelle}
          </Text>
        </View>
      ) : null}
    </View>
  );
}