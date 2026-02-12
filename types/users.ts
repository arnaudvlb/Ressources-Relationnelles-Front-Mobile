import { Role } from "./roles";

export type User= {
   id_utilisateur: number;

  nom: string;
  prenom: string;

  telephone: string | null;

  email: string;

  pseudo: string;

  photo_profil: string | null;

  statut_compte: "ACTIF" | "DESACTIVE" | "BLOQUE";

  date_creation: string;

  role: Role;
}