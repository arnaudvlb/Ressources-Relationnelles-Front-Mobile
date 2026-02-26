import { Role } from "./roles";

export type User= {
  id_utilisateur: number,

  nom: string|null,
  prenom: string|null,

  telephone: string | null,

  email: string,

  pseudo: string,

  photo_profil: string | null,

  statut_compte: boolean,

  date_creation: string,

  role: Role,
}