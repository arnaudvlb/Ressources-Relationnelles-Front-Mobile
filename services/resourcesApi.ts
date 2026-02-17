import { Ressource } from "@/types/ressources";


const BASE_URL="http://192.168.1.12/api/"

//Recuperation des ressources
export async function fetchRessources():Promise<Ressource[]> {
    const res = await fetch(`${BASE_URL}/ressources`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
    });

    //erreur
    if (!res.ok){
        const text= await res.text;
        throw new Error(`Erreur API (${res.status}) : ${text}`);
    }    

    const data=(await res.json()) as Ressource[]

    return data
}