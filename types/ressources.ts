import { Categorie } from "./categories";
import { Commentaire } from "./commentaires";
import { Media } from "./medias";
import { Tag } from "./tags";
import { User } from "./users";


export type Ressource = {
  id_ressource: number;
  titre: string;
  contenu: string;
  valide: boolean;
  active: boolean;
  date_creation: string;
  date_modification: string;
  visibilite: string;
  auteur: User;
  categorie: Categorie;
  tags: Tag[] | null;
  medias: Media[] | null;
  commentaire: Commentaire[] | null;

  likeCount: number;
  isLike: boolean;
  idLike: number;
  viewsCount: number;

  is_favorite: boolean;
  idFavoris: number;
};