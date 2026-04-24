import { AdorerAPI } from "@/types/API/adorersAPI";
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



