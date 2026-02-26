import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Ressource } from "@/types/ressources";
import mapUserAPItoUser from "./userMapper";

export default function mapRessourceAPItoRessource(d : RessourceAPI):Ressource{
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
        categorie:null,
        tags: null,
        medias: null,
        commentaire:null,
       
       
        likeCount: 0,
        isLike : false,
        viewsCount:0,
        is_favorite: false,
    }
}