import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";



//USER UNIQUEMENT POUR L'INSTANT
export default function mapUserAPItoUser(d:UserAPI):User{
    return {
        id_utilisateur:d.id,
        nom:d.nom,
        prenom: d.prenom,
        telephone: d.telephone,
        email: d.email,
        pseudo: d.pseudo,
        photo_profil: null,
        statut_compte: d.statusCompte,
        date_creation: d.dateCreation,
        role: "ROLE_USER"
    }

}