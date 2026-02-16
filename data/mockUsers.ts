import { User } from "@/types/users";

export const USERS: User[] = [
  {
    id_utilisateur: 1,
    nom: "Pastourel",
    prenom: "Andrea",
    telephone: "0600000000",
    email: "andrea@mail.com",
    pseudo: "pommepote",
    photo_profil: null,
    statut_compte: "ACTIF",
    date_creation: "2026-01-01",
    role: "ROLE_USER",
  },
  {
    id_utilisateur: 2,
    nom: "Vlb",
    prenom: "Arnaud",
    telephone: null,
    email: "arnaud@mail.com",
    pseudo: "arnaud",
    photo_profil: null,
    statut_compte: "ACTIF",
    date_creation: "2026-01-01",
    role: "ROLE_ADMIN",
  },
];
