import { httpRequest } from "./httpClient";

export type CreateLikePayload = {
  dateAdorer: string;
  id_utilisateur: number;
  id_resource: number;
};

export type CreateFavorisPayload = {
  id_utilisateur: number;
  id_resource: number;
};

export type CreateConsultationPayload = {
  id_utilisateur: number | null;
  id_resource: number;
};

export async function apiSetLike(payload: CreateLikePayload) {
  return httpRequest<any>({
    method: "POST",
    path: "/adorers",
    auth: true,
    body: payload,
  });
}

export async function apiRemoveLike(id: number) {
  return httpRequest<void>({
    method: "DELETE",
    path: `/adorers/${id}`,
    auth: true,
  });
}

export async function apiSetFavoris(payload: CreateFavorisPayload) {
  return httpRequest<any>({
    method: "POST",
    path: "/favoris",
    auth: true,
    body: payload,
  });
}

export async function apiRemoveFavoris(id: number) {
  return httpRequest<void>({
    method: "DELETE",
    path: `/favoris/${id}`,
    auth: true,
  });
}

export async function apiSetConsultation(payload: CreateConsultationPayload) {
  return httpRequest<any>({
    method: "POST",
    path: "/consultations",
    auth: true,
    body: payload,
  });
}