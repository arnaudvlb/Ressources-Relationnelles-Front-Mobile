import { UserAPI } from "./API/usersAPI";

export type Ami = {
  id: number;
  statut: string;
  dateAction: string;
  demandeur: UserAPI ;
  ami: UserAPI ;
};