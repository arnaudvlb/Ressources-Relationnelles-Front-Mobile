import { API_BASE_URL } from "@/config/api";
import { getAccessToken } from "@/services/authStorage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  path: string;
  body?: unknown;
  auth?: boolean;
  contentType?: string;
};

export async function httpRequest<T>({
  method = "GET",
  path,
  body,
  auth = false,
  contentType = "application/json",
}: RequestOptions): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (body) {
    headers["Content-Type"] = contentType;
  }

  if (auth) {
    const token = await getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      data?.detail ||
      data?.error ||
      `Erreur API (${res.status})`;

    throw new Error(msg);
  }

  return data as T;
}