import { Ressource } from "@/types/ressources";
import { Pressable, Text, View } from "react-native";

type Props = {
  styles: any;
  ressource: Ressource;
  views: number;
  likeCount: number;
  datetext: string;
  handleActionLike: () => void;
  handleActionFavoris: () => void;
  favoris: boolean;
  liked: boolean;
};

export default function RessourceStats({
  styles,
  ressource,
  views,
  likeCount,
  datetext,
  handleActionLike,
  handleActionFavoris,
  favoris,
  liked,
}: Readonly<Props>) {
  const categorieLibelle = ressource.categorie?.libelle;
  const categorieCouleur = ressource.categorie?.couleur;

  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          Par {ressource.auteur?.pseudo ?? "Auteur inconnu"}
        </Text>

        <Text style={styles.metaText}>{datetext}</Text>

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

      <Text style={styles.content}>{ressource.contenu}</Text>

      <View style={styles.actionsRow}>
        <Pressable
          onPress={handleActionLike}
          style={[
            styles.actionBtn,
            liked ? styles.actionBtnActiveLike : null,
          ]}
        >
          <Text
            style={[
              styles.actionText,
              liked ? styles.actionTextActiveLike : null,
            ]}
          >
            {liked ? "❤️" : "🤍"} {likeCount}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleActionFavoris}
          style={[
            styles.actionBtn,
            favoris ? styles.actionBtnActiveFav : null,
          ]}
        >
          <Text
            style={[
              styles.actionText,
              favoris ? styles.actionTextActiveFav : null,
            ]}
          >
            {favoris ? "⭐" : "☆"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.viewsText}>👁️ {views} vue(s)</Text>
    </View>
  );
}