import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new NextResponse("Invalid Credentials", {
        status: 401,
      });
    }
    const body = await req.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      throw new NextResponse("Invalid Data", {
        status: 401,
      });
    }

    const listingAndReservation = await prisma?.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservation, {
      status: 200,
    });
  } catch (error: any) {
    console.log("ERROR FROM RESERVATION", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
