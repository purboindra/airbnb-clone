import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { ReservationsClient } from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({
    authorId: currentUser?.id,
  });

  if (!currentUser || reservations?.length === 0) {
    return (
      <EmptyState
        title={!currentUser ? "Unauthorized" : "No reservations found"}
        subtitle={
          !currentUser
            ? "Please sign in first..."
            : "Looks like you havent reservations on your properties"
        }
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
