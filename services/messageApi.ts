import { Message } from "@/types/messages";
import { httpRequest } from "./httpClient";

export type MessagesResponse = {
  member: Message[];
  totalItems?: number;
  "@context"?: string;
  "@id"?: string;
  "@type"?: string;
};

export type MessageResponse = Message;

export type CreateMessagePayload = {
  contenu: string;
  pieceJointe?: string | null;
  dateEnvoi: string;
  id_expediteur: number;
  id_destinataire: number;
};

export type CreateMessageResponse = {
  message: string;
};

export async function apiGetAllMessages(): Promise<MessagesResponse> {
  return httpRequest<MessagesResponse>({
    method: "GET",
    path: "/messages",
    auth: true,
  });
}

export async function apiGetMessageById(id: number): Promise<MessageResponse> {
  return httpRequest<MessageResponse>({
    method: "GET",
    path: `/messages/${id}`,
    auth: true,
  });
}

export async function apiCreateMessage(
  payload: CreateMessagePayload
): Promise<CreateMessageResponse> {
  return httpRequest<CreateMessageResponse>({
    method: "POST",
    path: "/messages",
    auth: true,
    body: payload,
  });
}

export async function apiDeleteMessage(id: number): Promise<void> {
  return httpRequest<void>({
    method: "DELETE",
    path: `/messages/${id}`,
    auth: true,
  });
}