import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    const queries: any = {};

    if (listingId) {
      queries.listingId = listingId;
    } else if (userId) {
      queries.userId = userId;
    } else {
      queries.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: queries,
      include: {
        listings: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listings,
        createdAt: reservation.listings.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    console.log("ERROR GET RESERVATIONS", error);
    return null;
  }
}
