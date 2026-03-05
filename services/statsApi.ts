import { AdorerAPI } from "@/types/API/adorersAPI";
import { httpRequest } from "./httpClient";


export async function setLike(data : Partial<AdorerAPI>) {
    return httpRequest({
        method:"POST",
        path:"/adorers"
    })

    
}