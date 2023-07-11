import React from "react";
import { SafeListing, SafeUser } from "../types";
import { Container } from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  currentUser?: SafeUser | null;
  favorites?: SafeListing[] | null;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  favorites,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites?.map((fav) => (
          <ListingCard key={fav.id} data={fav} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};
