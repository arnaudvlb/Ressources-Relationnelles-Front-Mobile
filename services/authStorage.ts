import AsyncStorage from "@react-native-async-storage/async-storage";


//Cle constante pour le stockage de l'acces token 
const ACCESS_TOKEN_KEY="access_token";

//Enregistrement du token 
export async function saveAccessToken(token:string) {

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY,token);
    
}


//recuperation du token 
export async function getAccessToken() {

    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    
}

//Suppresion du token 
export async function removeAccessToken() {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
}