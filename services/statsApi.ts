import { httpRequest } from "./httpClient";

export type CreateLikePayload = {
  dateAdorer: string;
  utilisateur: string;
  resource: string;
};

export type CreateFavorisPayload = {
  utilisateur: string;
  resource: string;
};

export type CreateConsultationPayload = {
  utilisateur: string | null;
  resource: string;
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

export async function apiRemoveFavoris(id: number): Promise<void> {
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