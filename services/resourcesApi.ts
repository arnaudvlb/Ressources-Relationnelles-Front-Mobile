import { mapRessourceAPItoRessource } from "@/mappers/ressourceMapper";
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

export type RessourcesFiltre = {
  search?: string| null,
  typeId?:string| null,
  categorieId:string| null,
  tagIds?: string[],
}


//Get ressources
export async function apiListRessources(
  filtre?: RessourcesFiltre
): Promise<Ressource[]> {
  const params = new URLSearchParams();

  if (filtre?.search?.trim()) {
    params.append("search", filtre.search.trim());
  }

  if (filtre?.typeId) {
    params.append("typeId", filtre.typeId);
  }

  if (filtre?.categorieId) {
    params.append("categorieId", filtre.categorieId);
  }

  if (filtre?.tagIds && filtre.tagIds.length > 0) {
    params.append("tagIds", filtre.tagIds.join(","));
  }

  const query = params.toString();

  const data = await httpRequest<any>({
    method: "GET",
    path: query ? `/ressources?${query}` : "/ressources",
    auth: false,
  });

  const mapped = await Promise.all(
    data.map(mapRessourceAPItoRessource)
  );

  return mapped;
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