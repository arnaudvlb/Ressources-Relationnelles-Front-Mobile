import { UserAPI } from "./usersAPI";

export type RessourceAPI = {

  id: number;
  titre: string;
  contenu: string;

  valide: boolean;
  dateCreation: string;     
  estVisible: boolean;

  visibilite: "public" | "amis" | "privé";

  utilisateur: UserAPI;     
  medias: string[];         
  tagsRessources: string[]; 
  categories: string[];     
  commentaires: string[];   
};
  
  
