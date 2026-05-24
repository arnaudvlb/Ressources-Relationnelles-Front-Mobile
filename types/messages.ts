import { UserAPI } from "./API/usersAPI";

export type Message = {
id: number;
  contenu: string;
  pieceJointe?: string | null;
  dateEnvoi: string;
  expediteur: UserAPI;
  destinataire: UserAPI;
}
