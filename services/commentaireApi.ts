import { Commentaire } from "@/types/commentaires";
import { httpRequest } from "./httpClient";

export type CreateCommentairePayload = {
  contenu: string;
  utilisateur: string;
  resource: string;
  commentaireParent?: string | null;
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