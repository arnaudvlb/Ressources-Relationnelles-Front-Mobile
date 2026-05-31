import { getCurrentUser } from "@/services/userStorage";
import { AdorerAPI } from "@/types/API/adorersAPI";
import { FavorisAPI } from "@/types/API/favorisAPI";
import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Commentaire } from "@/types/commentaires";
import { Media } from "@/types/medias";
import { Ressource } from "@/types/ressources";
import { Tag } from "@/types/tags";
import { mapUserAPItoUser, mapUsertoUserAPi } from "./userMapper";

function getUserId(user: any): number | null {
  if (!user) return null;

  if (typeof user === "number") return user;

  if (typeof user === "string") {
    const id = Number(user.split("/").pop());
    return isNaN(id) ? null : id;
  }

  return user.id ?? user.id_utilisateur ?? null;
}

export async function mapRessourceAPItoRessource(
  d: RessourceAPI
): Promise<Ressource> {
  const currentUser = await getCurrentUser();

  const currentUserId = getUserId(currentUser);

  const adorers = Array.isArray(d.adorers) ? d.adorers : [];
  const favoris = Array.isArray(d.favoris) ? d.favoris : [];

  console.log("========== MAPPER RESSOURCE ==========");
  console.log("currentUser dans mapper :", currentUser);
  console.log("currentUserId dans mapper :", currentUserId);
  console.log("adorers dans mapper :", adorers);
  console.log("favoris dans mapper :", favoris);

  const userLike = currentUserId
    ? adorers.find((a: AdorerAPI) => {
        const utilisateurId = getUserId(a.utilisateur);
        console.log("id utilisateur like testé :", utilisateurId);
        return utilisateurId === currentUserId;
      })
    : null;

  const userFavoris = currentUserId
    ? favoris.find((f: FavorisAPI) => {
        const utilisateurId = getUserId(f.utilisateur);
        console.log("id utilisateur favori testé :", utilisateurId);
        return utilisateurId === currentUserId;
      })
    : null;

  console.log("userLike trouvé :", userLike);
  console.log("userFavoris trouvé :", userFavoris);
  console.log("userFavoris trouvé :", d.visibilite);
  console.log("visible :", d.valide);
  console.log("========== FIN MAPPER RESSOURCE ==========");

  return {
    id_ressource: d.id,
    titre: d.titre,
    contenu: d.contenu,
    valide: d.valide,
    active: d.valide,
    date_creation: d.dateCreation,
    date_modification: "",
    visibilite: d.visibilite,
    auteur: mapUserAPItoUser(d.utilisateur),
    categorie: d.categories,
    tags: (d.tagsRessources as Tag[]) ?? null,
    medias: (d.medias as Media[]) ?? null,
    commentaire: (d.commentaires as Commentaire[]) ?? null,

    likeCount: d.adorers?.length ?? 0,
    isLike: !!userLike,
    idLike: userLike?.id ?? 0,

    viewsCount: d.consultations?.length ?? 0,

    is_favorite: !!userFavoris,
    idFavoris: userFavoris?.id ?? 0,
  };
}

export async function mapRessourcetoRessourceAPI(
  d: Ressource
): Promise<RessourceAPI> {
  return {
    id: d.id_ressource,
    titre: d.titre,
    contenu: d.contenu,
    valide: d.valide,
    estVisible: d.active,
    dateCreation: d.date_creation,
    visibilite: d.visibilite,
    utilisateur: mapUsertoUserAPi(d.auteur),
    categories: d.categorie,
    tagsRessources: d.tags,
    medias: d.medias,
    commentaires: d.commentaire,
    consultations: [],
    partages: [],
    adorers: [],
    favoris: [],
  };
}