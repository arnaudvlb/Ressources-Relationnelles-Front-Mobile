import { RessourceAPI } from "./ressourcesAPI";
import { UserAPI } from "./usersAPI";

export type ConsultationAPI={
    id:number,
    dateConsultation : string,
    utilisateur : UserAPI |null,
    resource : RessourceAPI,
}