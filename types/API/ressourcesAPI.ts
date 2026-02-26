import { UserAPI } from "./usersAPI";

export type RessourceAPI = {

  id: number;
  titre: string;
  contenu: string;

  valide: boolean;
  dateCreation: string;     
  estVisible: boolean;

  visibilite: string;

  utilisateur: UserAPI;     
  medias:unknown[];         
  tagsRessources: unknown[]; 
  categories: unknown[];     
  commentaires: unknown[];   
};
  
  
