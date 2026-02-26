import { RessourceAPI } from "./ressourcesAPI"
import { UserAPI } from "./usersAPI"

export type AdorerAPI={
    id: number,
    dateAdorer: string,
    utilisateur: UserAPI,
    resource:RessourceAPI,
}