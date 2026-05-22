import { Commentaire } from "@/types/commentaires";
import { Ressource } from "@/types/ressources";
import { User } from "@/types/users";
import { httpRequest } from "./httpClient";

export type CreateCommentairePayload = {
  contenu: string;
  utilisateur: User;
  resource: Ressource;
  commentaireParent?: Commentaire | null;
};

export async function apiCreateCommentaire(
  payload: CreateCommentairePayload
): Promise<Commentaire> {
  return await httpRequest<Commentaire>({
    method: "POST",
    path: "/commentaires",
    auth: true,
    body: payload,
  });
}