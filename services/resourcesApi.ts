import mapRessourceAPItoRessource from "@/mappers/ressourceMapper";
import { RessourceAPI } from "@/types/API/ressourcesAPI";
import { Ressource } from "@/types/ressources";
import { httpRequest } from "./httpClient";


export type ListRessourcesResponseAPI = {
  member: RessourceAPI[];
  totalItems?: number;
  "@context"?: string;
  "@id"?: string;
  "@type"?: string;
};

//Get ressources
export async function apiListRessources(): Promise<Ressource[]> {
    const data = await httpRequest<ListRessourcesResponseAPI>({
    method: "GET",
    path: "/ressources",
    auth: false,
  });

 return data.member.map(mapRessourceAPItoRessource)
}


export async function apiGetRessource(id:number):Promise<Ressource> {
    return httpRequest<Ressource>({
        method:"GET",
        path:`/ressources/${id}`,
        auth:false,
    })
    
}