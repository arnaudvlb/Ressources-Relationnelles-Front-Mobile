
import { getUserId } from "@/config/format";
import { apiGetAllAmis } from "@/services/amiApi";
import { getCurrentUser } from "@/services/userStorage";
import { Ami } from "@/types/amis";
import { Ressource } from "@/types/ressources";
import { useEffect, useMemo, useState } from "react";


export function useVisibleRessources(ressources: Ressource[]) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [friendIds, setFriendIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadUserAndFriends() {
      try {
        const user = await getCurrentUser();

        if (getUserId(user)) {
          return;
        }

        const userId = String(getUserId(user));
        setCurrentUserId(userId);

        const amis = await apiGetAllAmis();

        const idsAmis = amis.member
          .map((ami: Ami) => {
            const userAId = String(ami.demandeur?.id  );

            const userBId = String( ami.ami?.id  );

            if (userAId === userId) {
              return userBId;
            }

            if (userBId === userId) {
              return userAId;
            }

            return null;
          })
          .filter((id: string | null): id is string => Boolean(id));

        setFriendIds(idsAmis);
      } catch (error) {
        console.log("Erreur lors du chargement de l'utilisateur ou des amis :", error);
      }
    }

    loadUserAndFriends();
  }, []);

  const visibleRessources = useMemo(() => {
    return ressources.filter((ressource) => {
      const isActive =
        ressource.active === true ||
        ressource.valide === true;

      const visibilite = ressource.visibilite;

      const authorId = String(getUserId(ressource.auteur.id_utilisateur));

      if (!isActive) {
        return false;
      }

      if (visibilite === "public") {
        return true;
      }

      if (visibilite === "private" && authorId === currentUserId) {
        return true;
      }

      if (visibilite === "friends" && friendIds.includes(authorId)) {
        return true;
      }

      return false;
    });
  }, [ressources, currentUserId, friendIds]);

  return {
    visibleRessources,
    currentUserId,
    friendIds,
  };
}