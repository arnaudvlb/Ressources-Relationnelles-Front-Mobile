import { RessourceAPI } from "./ressourcesAPI"
import { UserAPI } from "./usersAPI"

export type FavorisAPI={

     id:number,
     utilisateur:UserAPI,
     resource:RessourceAPI,
}