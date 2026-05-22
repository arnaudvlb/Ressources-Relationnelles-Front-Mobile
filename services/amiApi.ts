
import { Ami } from "@/types/amis";
import { User } from "@/types/users";
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
  demandeur: string;
  ami: string;
};

export type UsersResponse = {
  member: User[];
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


export type CreateAmiResponse = {
  message: string;
};

export async function apiCreateAmi(
  payload: CreateAmiPayload
): Promise<CreateAmiResponse> {
  console.log("apiCreateAmi payload", payload);

  const response = await httpRequest<CreateAmiResponse>({
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