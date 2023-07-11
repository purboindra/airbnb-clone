import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const favoritesListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favoritesListings.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    console.log("ERROR FROM GET FAVORITE LISTING", error);
  }
}
