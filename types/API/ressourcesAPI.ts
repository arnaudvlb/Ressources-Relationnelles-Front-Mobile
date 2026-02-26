import { AdorerAPI } from "./adorersAPI";
import { CategorieAPI } from "./categoriesAPI";
import { ConsultationAPI } from "./consultationAPI";
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
  medias:unknown[],     
  tagsRessources: unknown[], 
  categories: CategorieAPI, 
  commentaires: unknown[], 
  
  consultations:ConsultationAPI[], 
  partages:unknown[],
  adorers:AdorerAPI[],
  favoris:FavorisAPI[], 
};
  
  
