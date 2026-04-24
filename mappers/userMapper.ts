import { UserAPI } from "@/types/API/usersAPI";
import { User } from "@/types/users";



//USER UNIQUEMENT POUR L'INSTANT
export  function mapUserAPItoUser(d:UserAPI):User{
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


export  function mapUsertoUserAPi (d:User):UserAPI{
    return {
        id:d.id_utilisateur,
        nom:d.nom,
        prenom: d.prenom,
        telephone: d.telephone,
        email: d.email,
        pseudo: d.pseudo,
        // photo_profil: null,
        statusCompte : d.statut_compte,
        dateCreation  : d.date_creation,
        //role: "ROLE_USER"
    }

}