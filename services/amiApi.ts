
import { Ami } from "@/types/amis";
import { UserAPI } from "@/types/API/usersAPI";
import { httpRequest } from "./httpClient";



export type AmiResponse = {
 member: Ami[];
   totalItems?: number;
   "@context"?: string;
   "@id"?: string;
   "@type"?: string;
};



export type CreateAmiPayload = {
  statut: string;
  dateAction: string;
  demandeur: number;
  ami: number;
};

export type UsersResponse = {
  member: UserAPI[];
  totalItems?: number;
  "@context"?: string;
  "@id"?: string;
  "@type"?: string;
};



export async function apiGetAllAmis(): Promise<AmiResponse> {
  return httpRequest<AmiResponse>({
    method: "GET",
    path: "/amis",
    auth: true,
  });
}


export async function apiGetAmiById(id: number): Promise<AmiResponse> {
  return httpRequest<AmiResponse>({
    method: "GET",
    path: `/amis/${id}`,
    auth: true,
  });
}


export async function apiCreateAmi(
  payload: CreateAmiPayload
): Promise<AmiResponse> {
  console.log("apiCreateAmi payload", payload);

  const response = await httpRequest<AmiResponse>({
    method: "POST",
    path: "/amis",
    auth: true,
    body: payload,
  });

  console.log("apiCreateAmi response", response);

  return response;
}
export async function apiDeleteAmi(id: number): Promise<void> {
  return httpRequest<void>({
    method: "DELETE",
    path: `/amis/${id}`,
    auth: true,
  });
}





export async function apiGetAllUsers(): Promise<UsersResponse> {
  return httpRequest<UsersResponse>({
    method: "GET",
    path: "/utilisateurs",
    auth: true,
  });
}