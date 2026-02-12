import { User } from "@/types/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Cle pour le stockage de l'utilisateur 
const CURRENT_USER_KEY="current_user";

//Stock l'utilisateur en local 
export async function saveCurrentUser(user:User) :Promise<void>{

    const json=JSON.stringify(user);
    await AsyncStorage.setItem(CURRENT_USER_KEY,json);
    
}

//Recuperer l'utilisateur 
export async function getCurrentUser():Promise<User | null> {
    const json =await AsyncStorage.getItem(CURRENT_USER_KEY);

    if (!json) return null;

    return JSON.parse(json) as User;
    
}

//Suppression de l'utilisateur 
export async function removeCurrentUser():Promise<void> {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
}


//Savoir si l'utilisateur est connecter 
export async function isUserLoggedIn():Promise<boolean> {
    const user = await getCurrentUser();
    return user !==null;
    
}

