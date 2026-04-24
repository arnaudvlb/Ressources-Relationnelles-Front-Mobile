import { AdorerAPI } from "@/types/API/adorersAPI";
import { ConsultationAPI } from "@/types/API/consultationsAPI";
import { FavorisAPI } from "@/types/API/favorisAPI";
import { httpRequest } from "./httpClient";


export async function apiSetLike(data : Partial<AdorerAPI>) {
    return httpRequest({
        method:"POST",
        path:"/adorers"
    })
}

export async function apiRemoveLike(id: number){
     return httpRequest({
        method:"DELETE",
        path:`/adorers/${id}`    })
}


export async function apiGetLikes() {
    return httpRequest({
        method: "GET",
        path: "/adorers"
    });
}




export async function apiSetFavoris(data: Partial<FavorisAPI>) {
    return httpRequest({
        method:"POST",
        path:"/favoris"
    })
    
}



export async function apiRemoveFavoris(id:number) {
    return({
        method:"DELETE",
        path:"/favoris"
    })
    
}





export async function apiSetConsultation(data: Partial<ConsultationAPI>) {
    return httpRequest({
        method:"POST",
        path:"/consultations"
    })
    
}



export async function apiRemoveConsultation(id:number) {
    return({
        method:"DELETE",
        path:"/consultations"
    })
    
}

