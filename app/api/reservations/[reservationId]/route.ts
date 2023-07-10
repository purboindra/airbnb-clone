import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { reservationId } = params;
    if (!currentUser) {
      throw new NextResponse("Invalid Credentials", {
        status: 401,
      });
    }

    if (!reservationId || typeof reservationId !== "string") {
      throw new NextResponse("Invalid Reservation Id", {
        status: 401,
      });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          {
            userId: currentUser.id,
          },
          {
            listings: {
              userId: currentUser.id,
            },
          },
        ],
      },
    });

    return NextResponse.json(reservation, {
      status: 200,
    });
  } catch (error: any) {
    console.log("ERROR DELETE RESERVATION", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
