import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoritesListings";
import EmptyState from "../components/EmptyState";
import { FavoritesClient } from "./FavoritesClient";

const FavoritesPage = async () => {
  const getFavorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  if (getFavorites?.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you no have favorites listings"
      />
    );
  }
  return <FavoritesClient favorites={getFavorites} currentUser={currentUser} />;
};

export default FavoritesPage;
