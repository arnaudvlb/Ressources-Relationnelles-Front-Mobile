import { getCurrentUser } from "@/services/userStorage";
import { AdorerAPI } from "@/types/API/adorersAPI";
import { FavorisAPI } from "@/types/API/favorisAPI";
import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Commentaire } from "@/types/commentaires";
import { Media } from "@/types/medias";
import { Ressource } from "@/types/ressources";
import { Tag } from "@/types/tags";
import { mapUserAPItoUser, mapUsertoUserAPi } from "./userMapper";



export async function mapRessourceAPItoRessource(d: RessourceAPI): Promise<Ressource> {
  const currentUser = await getCurrentUser();

  const currentUserId = currentUser?.id_utilisateur ?? null;

  const adorers = Array.isArray(d.adorers) ? d.adorers : [];
  const favoris = Array.isArray(d.favoris) ? d.favoris : [];

  const isLike = currentUserId
    ? adorers.some((a: AdorerAPI) => a.utilisateur.id === currentUserId)
    : false;

  const userLike = currentUserId
    ? adorers.find((a: AdorerAPI) => a.utilisateur.id === currentUserId)
    : null;

  const isFavorite = currentUserId
    ? favoris.some((f: FavorisAPI) => f.utilisateur.id === currentUserId)
    : false;

  const userFavoris = currentUserId
    ? favoris.find((f: FavorisAPI) => f.utilisateur.id === currentUserId)
    : null;

  return {
    id_ressource: d.id,
    titre: d.titre,
    contenu: d.contenu,
    valide: d.valide,
    active: d.estVisible,
    date_creation: d.dateCreation,
    date_modification: "",
    visibilite: d.visibilite,
    auteur: mapUserAPItoUser(d.utilisateur),
    categorie: d.categories,
    tags: (d.tagsRessources as Tag[]) ?? null,
    medias: (d.medias as Media[]) ?? null,
    commentaire: (d.commentaires as Commentaire[]) ?? null,

    likeCount: d.adorers?.length ?? 0,
    isLike: isLike,
    idLike: userLike?.id ?? 0,
    viewsCount: d.consultations?.length ?? 0,

    is_favorite: isFavorite,
    idFavoris: userFavoris?.id ?? 0,
  };
}



export  async function mapRessourcetoRessourceAPI(d: Ressource): Promise<RessourceAPI> {
  const currentUser = await getCurrentUser(); // User | null


    return{
        id: d.id_ressource,
        titre: d.titre,
        contenu: d.contenu,
        valide: d.valide,
        estVisible : d.active,
        dateCreation : d.date_creation,
        visibilite: d.visibilite,
        utilisateur: mapUsertoUserAPi(d.auteur),
        categories:d.categorie,
        tagsRessources: d.tags,
        medias: d.medias,
        commentaires:d.commentaire,
        consultations:[],
        partages:[],
        adorers:[],
        favoris:[],

    }
}