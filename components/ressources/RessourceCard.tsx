import { Ressource } from "@/types/ressources";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  styles: any;
  item: Ressource;
  statsMap: any;
  loading: boolean;
  error: string | null ;
  colors: any;
};

export function RessourceCard({ styles, item, statsMap, loading, error, colors }: Readonly<Props>) {
  const dateText = item.date_creation ? String(item.date_creation).slice(0, 10) : "-";

  const stats = statsMap?.[String(item.id_ressource)];
  const views = stats?.views ?? 0;
  const likes = stats?.likesCount ?? 0;

  const categorie = item.categorie ?? null;
  const tags = Array.isArray(item.tags) ? item.tags : [];

  if (loading) {
    return (
      <>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.empty}>Chargement des ressources...</Text>
      </>
    );
  }

  if (error) {
    return (
      
        <Text style={styles.empty}>{String(error)}</Text>
      
    );
  }

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/ressources/[id]",
          params: { id: String(item.id_ressource) },
        });
      }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Text style={styles.titleText}>{item.titre}</Text>

        {categorie ? (
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: categorie.couleur }]}>
              {categorie.libelle}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Par {item.auteur?.pseudo ?? "—"}</Text>
        <Text style={styles.metaText}>{dateText}</Text>

        
        <Text style={styles.metaText}>👁 {views}</Text>
        <Text style={styles.metaText}>❤️ {likes}</Text>
      </View>

    {/* <View style={styles.tagsRow}>
      {tags.map((t, idx) => (
        <View
          key={t?.id_tag != null ? String(t.id_tag) : `tag-${item.id_ressource}-${idx}`}
          style={styles.tag}
        >
          <Text style={[styles.tagText, { color: t?.couleur ?? colors.text }]}>
            #{t?.libelle ?? "tag"}
          </Text>
        </View>
      ))}
</View> */}
    </Pressable>
  );
}