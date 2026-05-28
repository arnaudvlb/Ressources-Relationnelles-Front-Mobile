import { getUserId } from "@/config/format";
import { apiGetAllAmis } from "@/services/amiApi";
import { getCurrentUser } from "@/services/userStorage";
import { Ressource } from "@/types/ressources";
import { useEffect, useMemo, useState } from "react";

export function useVisibleRessources(ressources: Ressource[]) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [friendIds, setFriendIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadUserAndFriends() {
      try {
        const currentUser = await getCurrentUser();
        const userId = getUserId(currentUser);

        if (!userId) {
          return;
        }

        const currentId = String(userId);
        setCurrentUserId(currentId);

        const amis = await apiGetAllAmis();

        const idsAmis = amis.member
          .map((ami: any) => {
            const userAId = String(
              ami.userA?.id ??
                ami.userA?.id_utilisateur ??
                ami.demandeur?.id ??
                ami.demandeur?.id_utilisateur ??
                ami.utilisateur?.id ??
                ami.utilisateur?.id_utilisateur ??
                ami.user?.id ??
                ami.user?.id_utilisateur ??
                ami.utilisateur_id ??
                ami.id_user_1 ??
                ""
            );

            const userBId = String(
              ami.userB?.id ??
                ami.userB?.id_utilisateur ??
                ami.receveur?.id ??
                ami.receveur?.id_utilisateur ??
                ami.ami?.id ??
                ami.ami?.id_utilisateur ??
                ami.friend?.id ??
                ami.friend?.id_utilisateur ??
                ami.ami_id ??
                ami.id_user_2 ??
                ""
            );

            if (userAId === currentId) {
              return userBId;
            }

            if (userBId === currentId) {
              return userAId;
            }

            return null;
          })
          .filter((id: string | null): id is string => Boolean(id));

        setFriendIds(idsAmis);
      } catch (error) {
        console.log(
          "Erreur lors du chargement de l'utilisateur ou des amis :",
          error
        );
      }
    }

    loadUserAndFriends();
  }, []);

  const visibleRessources = useMemo(() => {
    return ressources.filter((ressource: any) => {
      const isActive =
        ressource.active === true ||
        ressource.active === 1 ||
        ressource.est_visible === true ||
        ressource.est_visible === 1;

      const visibilite = ressource.visibilite;

      const authorId = String(
        ressource.utilisateur?.id ??
          ressource.utilisateur?.id_utilisateur ??
          ressource.auteur?.id ??
          ressource.auteur?.id_utilisateur ??
          ressource.utilisateur_id ??
          ""
      );

      if (!isActive) {
        return false;
      }

      if (visibilite === "public") {
        return true;
      }

      if (
        (visibilite === "private" || visibilite === "prive") &&
        authorId === currentUserId
      ) {
        return true;
      }

      if (
        (visibilite === "friend" ||
          visibilite === "friends" ||
          visibilite === "amis") &&
        friendIds.includes(authorId)
      ) {
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