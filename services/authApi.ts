import { httpRequest } from "@/services/httpClient";
import { User } from "@/types/users";

export type AuthResponse = {
  data: {
    token:string;
    user: User;
  }
};

export async function apiLogin(payload: { email: string; password: string }): Promise<AuthResponse> {
  return httpRequest<AuthResponse>({
    method: "POST",
    path: "/login_check",
    body: payload,
    auth: false,
  });
}

export async function apiRegister(payload: any): Promise<AuthResponse> {
  return httpRequest<AuthResponse>({
    method: "POST",
    path: "/register",
    body: payload,
    auth: false,
  });
}
