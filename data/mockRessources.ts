import { Ressource } from "@/types/ressources";
import { CATEGORIES } from "./mockCategorie";
import { TAGS } from "./mockTags";
import { TYPES } from "./mockTypes";
import { USERS } from "./mockUsers";


export const MOCK_RESSOURCES: Ressource[] = [
  {
    id_ressource: 1,
    titre: "Rappel : les bases",
    contenu:
      "Objectif : poser les fondations du rappel. Travailler en milieu calme, renforcer la motivation, augmenter progressivement la difficulté.",
    valide: true,
    active: true,
    date_creation: "2026-02-01",
    date_modification: "2026-02-03",
    visibilite: "PUBLIC",
    type: TYPES[0],
    auteur: USERS[0],
    categorie: CATEGORIES[0],
    tags: [TAGS[0]],
    medias: [],
    adore_count: 12,
    is_favorite: true,
  },
  {
    id_ressource: 2,
    titre: "Marche en laisse : erreurs fréquentes",
    contenu:
      "Vidéo synthèse : anticipation, cohérence du cadre, gestion des distances, et erreurs classiques qui renforcent la traction.",
    valide: true,
    active: true,
    date_creation: "2026-01-20",
    date_modification: "2026-02-02",
    visibilite: "PUBLIC",
    type: TYPES[1],
    auteur: USERS[1],
    categorie: CATEGORIES[0],
    tags: [TAGS[1]],
    medias: [
      {
        id_media: 1,
        chemin_fichier: "/medias/video1.mp4",
        nom_fichier: "marche-en-laisse.mp4",
        date_upload: "2026-02-02",
        taille: 12800000,
      },
    ],
    adore_count: 41,
    is_favorite: false,
  },
  {
    id_ressource: 3,
    titre: "Checklist trousse de secours",
    contenu:
      "PDF à imprimer : inventaire + conseils d’organisation. Ajouter des dates de péremption et vérifier régulièrement.",
    valide: true,
    active: true,
    date_creation: "2026-01-10",
    date_modification: "2026-01-15",
    visibilite: "PUBLIC",
    type: TYPES[2],
    auteur: USERS[0],
    categorie: CATEGORIES[1],
    tags: [TAGS[2]],
    medias: [
      {
        id_media: 2,
        chemin_fichier: "/medias/checklist.pdf",
        nom_fichier: "trousse-secours.pdf",
        date_upload: "2026-01-15",
        taille: 540000,
      },
    ],
    adore_count: 7,
    is_favorite: false,
  },
  {
    id_ressource: 4,
    titre: "Rééquilibrage alimentaire",
    contenu:
      "Construire une routine stable : repas structurés, hydratation, écoute des sensations, et éviter la restriction excessive.",
    valide: true,
    active: true,
    date_creation: "2026-02-05",
    date_modification: "2026-02-05",
    visibilite: "PUBLIC",
    type: TYPES[0],
    auteur: USERS[1],
    categorie: CATEGORIES[2],
    tags: [TAGS[3]],
    medias: [],
    adore_count: 3,
    is_favorite: false,
  },
];


export function listRessources(): Ressource[] {
  return MOCK_RESSOURCES;
}

// (Bonus utile pour plus tard) Fonction : trouver une ressource par id
export function getRessourceById(id: number): Ressource | undefined {
  return MOCK_RESSOURCES.find((r) => r.id_ressource === id);
}