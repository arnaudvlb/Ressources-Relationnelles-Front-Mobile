import { Categorie } from "./categories";
import { Media } from "./medias";
import { Tag } from "./tags";
import { Type } from "./types";
import { User } from "./users";

export type dbRessource = {
  id_ressource: number;
  titre: string;
  contenu: string;
  valide: boolean;
  active: boolean;
  date_creation: string;
  date_modification: string;
  visibilite: "PUBLIC" | "PRIVE";
  type: Type;
  auteur: User;
  categorie?: Categorie | null;
  tags: Tag[];
  medias: Media[];
  adore_count: number;
  is_favorite: boolean;
};