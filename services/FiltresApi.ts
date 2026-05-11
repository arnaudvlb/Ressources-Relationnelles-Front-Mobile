import type { Categorie } from "@/types/categories";
import type { Tag } from "@/types/tags";
import type { Type } from "@/types/types";
import { httpRequest } from "./httpClient";

export async function apiListTypes(): Promise<Type[]> {
  const data = await httpRequest<any>({
    method: "GET",
    path: "/types",
    auth: false,
  });

  return data.member ?? data;
}

export async function apiListCategories(): Promise<Categorie[]> {
  const data = await httpRequest<any>({
    method: "GET",
    path: "/categories",
    auth: false,
  });

  return data.member ?? data;
}

export async function apiListTags(): Promise<Tag[]> {
  const data = await httpRequest<any>({
    method: "GET",
    path: "/tags",
    auth: false,
  });

  return data.member ?? data;
}