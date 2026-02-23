//Service temporaire
import AsyncStorage from "@react-native-async-storage/async-storage";

type RessourceStats={
    views:number;
    liked : boolean; 
    likesCount : number;
    favorite:boolean;
    favoriteCount : number;
};

//Dico des stat

type StatsMap= Record<string,RessourceStats>;

//Cle de stockage
const STATS_KEY = "ressource_stats";

//Lire toute les stats
async function readAll(): Promise<StatsMap> {

    const json = await AsyncStorage.getItem(STATS_KEY);

    if (!json) return {};

    return JSON.parse(json) as StatsMap;
    
}

// Fonction interne : écrire toutes les stats dans AsyncStorage
async function writeAll(map: StatsMap): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(map));
}

// Fonction : récupérer les stats d’une ressource (sans modifier les valeurs)
export async function getResourceStats(id: number): Promise<RessourceStats> {
  const map = await readAll();
  const key = String(id);
  return map[key] ?? { views: 0, favorite: false, likesCount: 0, liked: false };
}



//ecrire les stats
export async function getRessourceStats(id:number) : Promise<RessourceStats>{

    const map=await readAll();
    const key= String(id);
    return map[key]?? { views: 0, favorite: false, likesCount: 0, liked: false };
    
}

export async function incrementRessourceViews(id:number) : Promise<RessourceStats>{

    const map = await readAll();
    const key= String(id);
    const current = map[key]??{ views: 0, favorite: false, likesCount: 0, liked: false };

    const next ={...current,views : current.views+1};

    map[key]= next; 
    await writeAll(map);
    return next;

}

//Ajouter retirer favorie
export async function toggleRessourcesFavorite(id:number) {

    const map = await readAll();
    const key=String(id);
    const  current = map[key] ??{ views: 0, favorite: false, likesCount: 0, liked: false };
    const next= {...current,favorite:!current.favorite};

    map[key]=next;
    await writeAll(map);
    return next

}

//Ajouter retirer like 
export async function toggleRessourcesLikes(id:number) {

    const map = await readAll();
    const key=String(id);
    const  current = map[key] ?? { views: 0, favorite: false, likesCount: 0, liked: false };
    
    if (current.liked){
        const next={ ...current,liked:false, likedCount:Math.max(0,current.likesCount-1)};
        map[key]=next;
        await writeAll(map);
        return next
    }

        const next={ ...current,liked:false, likedCount:current.likesCount+1};
        map[key]=next;
        await writeAll(map);
        return next

}
