import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomsCount?: number;
  bathroomsCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      bathroomsCount,
      category,
      endDate,
      guestCount,
      roomsCount,
      startDate,
      locationValue,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomsCount) {
      query.roomsCount = {
        gte: +roomsCount,
      };
    }

    if (bathroomsCount) {
      query.bathroomsCount = {
        gte: +bathroomsCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: {
                  gte: startDate,
                },
                startDate: {
                  lte: startDate,
                },
              },
              {
                startDate: {
                  lte: endDate,
                },
                endDate: {
                  gte: endDate,
                },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.log("ERROR GET ALL LISTINGS", error);
    throw new Error(error);
  }
}
