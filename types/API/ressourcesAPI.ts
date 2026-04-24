import { Categorie } from "../categories";
import { AdorerAPI } from "./adorersAPI";
import { ConsultationAPI } from "./consultationsAPI";
import { FavorisAPI } from "./favorisAPI";
import { UserAPI } from "./usersAPI";

export type RessourceAPI = {

  id: number,
  titre: string,
  contenu: string,

  valide: boolean,
  dateCreation: string,     
  estVisible: boolean,

  visibilite: string,

  utilisateur: UserAPI,     
  medias:unknown[]|null,     
  tagsRessources: unknown[]|null, 
  categories: Categorie, 
  commentaires: unknown[]|null, 
  
  consultations:ConsultationAPI[]|null, 
  partages:unknown[]|null,
  adorers:AdorerAPI[]|null,
  favoris:FavorisAPI[]|null, 
};
  
  
