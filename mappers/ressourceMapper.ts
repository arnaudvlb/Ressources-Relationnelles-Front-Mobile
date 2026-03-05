import { getCurrentUser } from "@/services/userStorage";
import { AdorerAPI } from "@/types/API/adorersAPI";
import { FavorisAPI } from "@/types/API/favorisAPI";
import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Ressource } from "@/types/ressources";
import mapUserAPItoUser from "./userMapper";



export default async function mapRessourceAPItoRessource(d: RessourceAPI): Promise<Ressource> {
  const currentUser = await getCurrentUser(); // User | null

  const currentUserId = currentUser?.id_utilisateur ?? null;

  const isLike = currentUserId
    ? (d.adorers ?? []).some((a: AdorerAPI) => a.utilisateur.id === currentUserId)
    : false;
   const isFavorite = currentUserId
    ? (d.favoris ?? []).some((a: FavorisAPI) => a.utilisateur.id === currentUserId)
    : false;

    return{
        id_ressource: d.id,
        titre: d.titre,
        contenu: d.contenu,
        valide: d.valide,
        active: d.estVisible,
        date_creation: d.dateCreation,
        date_modification: "",
        visibilite: d.visibilite,
        auteur: mapUserAPItoUser(d.utilisateur),
        categorie:d.categories,
        tags: null,
        medias: null,
        commentaire:null,
       
         
        likeCount: d.adorers?.length ?? 0,
        isLike : isLike,
        viewsCount:d.consultations?.length ?? 0,
        is_favorite: isFavorite,

    }
}