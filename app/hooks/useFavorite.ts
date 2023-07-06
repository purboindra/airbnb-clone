import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useRegisterModal from "./useRegisterModal";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseFavorites {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let isFav: boolean;
        let request;
        if (hasFavorited) {
          isFav = false;
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          isFav = true;
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success(`Success ${!isFav ? "Delete" : "Add"} list`);
      } catch (error) {
        console.log("ERROR HOOKS FAVORITES", error);
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
