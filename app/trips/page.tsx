import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });
  if (!currentUser || reservations?.length === 0) {
    return (
      <EmptyState
        title={!currentUser ? "Unauthorized" : "No trips found"}
        subtitle={
          !currentUser
            ? "Please sign in first..."
            : "Looks like you havent reserved any trips"
        }
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
