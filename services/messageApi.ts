import { Message } from "@/types/messages";
import { httpRequest } from "./httpClient";

export type MessagesResponse = {
  member: Message[];
  totalItems?: number;
  "@context"?: string;
  "@id"?: string;
  "@type"?: string;
};

export type CreateMessagePayload = {
  contenu: string;
  pieceJointe?: string | null;
  dateEnvoie: string;
  id_expediteur: number;
  id_destinataire: number;
};

export async function apiGetAllMessages(): Promise<MessagesResponse> {
  return httpRequest<MessagesResponse>({
    method: "GET",
    path: "/messages",
    auth: true,
  });
}

export async function apiCreateMessage(
  payload: CreateMessagePayload
): Promise<Message> {
  return httpRequest<Message>({
    method: "POST",
    path: "/messages",
    auth: true,
    body: payload,
  });
}