import { CategorieAPI } from "@/types/API/categoriesAPI";
import { Categorie } from "@/types/categories";



export default function mapCategorieAPItoCategorie(d:CategorieAPI):Categorie{
    return {
        id_categorie:d.id,
        libelle:d.libelle,
        couleur:d.couleur,
    }

}