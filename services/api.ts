
const BASE_URL = "http://127.0.0.1:8000/api"

//Definition du type de reponse
type LoginResponse = {
    token?: string; 
    access_token?:string;
    refresh_token?:string;

};

//Appel de l'api 
export async function apiLogin(email: string,password: string): Promise<LoginResponse> {

    const res = await fetch()
}