"use client";

import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import { Container } from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations?: SafeReservation[] | null;
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .post(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Successfully cancel a reservations");
          router.refresh();
        })
        .catch((e) => {
          console.log(e?.response?.data?.error);
          toast.error("Something went wrong!");
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going "
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId == reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
