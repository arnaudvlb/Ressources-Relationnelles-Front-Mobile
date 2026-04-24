import * as SecureStore from "expo-secure-store";


//Cle constante pour le stockage de l'acces token 
const ACCESS_TOKEN_KEY="access_token";
const REFRESH_TOKEN_KEY="refresh_token";

//Enregistrement du token 
export async function saveAccessToken(token:string) {
    if(!token) throw new Error("Impossible de recuperer l'acces token")
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY,token);
    
}


//recuperation du token 
export async function getAccessToken() {

    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    
}

//Suppresion du token 
export async function removeAccessToken() {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
}




//Enregistrement du token 
export async function saveRefreshToken(token:string) {
    if(!token) throw new Error("Impossible de recuperer le refresh token")
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY,token);
    
}


//recuperation du token 
export async function getRefreshToken() {

    return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    
}

//Suppresion du token 
export async function removeRefreshToken() {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
}




 