import { getCurrentUser } from "@/services/userStorage";
import { AdorerAPI } from "@/types/API/adorersAPI";
import { FavorisAPI } from "@/types/API/favorisAPI";
import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Ressource } from "@/types/ressources";
import { mapUserAPItoUser, mapUsertoUserAPi } from "./userMapper";



export  async function mapRessourceAPItoRessource(d: RessourceAPI): Promise<Ressource> {
  const currentUser = await getCurrentUser(); // User | null

  const currentUserId = currentUser?.id_utilisateur ?? null;

  const isLike = currentUserId
    ? (d.adorers ?? []).some((a: AdorerAPI) => a.utilisateur.id === currentUserId)
    : false;
    const userLike =currentUserId
    ? (d.adorers ?? []).find((a: AdorerAPI) => a.utilisateur.id === currentUserId)
    : null;

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
        idLike:userLike?.id ?? 0,
        viewsCount:d.consultations?.length ?? 0,
        is_favorite: isFavorite,


    }
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