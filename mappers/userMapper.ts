import { getUserId } from "@/config/format";
import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";


export function mapUserAPItoUser(d: UserAPI): User {
  return {
    id_utilisateur: d.id,
    nom: d.nom,
    prenom: d.prenom,
    telephone: d.telephone,
    email: d.email,
    pseudo: d.pseudo,
    photo_profil: d.photo_profil ?? null,
    statut_compte: d.statusCompte,
    date_creation: d.dateCreation,
    role: "ROLE_USER",
  };
}

export function mapUsertoUserAPi(d: User): UserAPI {
  return {
    id: getUserId(d) ?? 0,
    nom: d.nom,
    prenom: d.prenom,
    telephone: d.telephone,
    email: d.email,
    pseudo: d.pseudo,
    photo_profil: d.photo_profil ?? null,
    statusCompte: d.statut_compte ?? true,
    dateCreation: d.date_creation ?? "",
  };
}