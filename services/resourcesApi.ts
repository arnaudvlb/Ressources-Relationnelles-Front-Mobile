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
  const data = await httpRequest<any>({
    method: "GET",
    path: "/ressources",
    auth: false,
  });

  const mapped = await Promise.all(
    data.map(mapRessourceAPItoRessource)
  );

  return mapped
}


//Get une ressources
export async function apiGetRessource(id: number): Promise<Ressource> {
  const data = await httpRequest<RessourceAPI>({
    method: "GET",
    path: `/ressources/${id}`,
    auth: false,
  });

  return await mapRessourceAPItoRessource(data);
}