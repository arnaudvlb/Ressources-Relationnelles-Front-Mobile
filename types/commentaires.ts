import { Ressource } from "./ressources"
import { User } from "./users"

export type Commentaire={
    id_commentaire:number,
    contenu:string,
    date_creation:string,
    auteur: User,
    commentaireParent: Commentaire |null,
    ressource: Ressource
}