import getCurrentUser from "@/app/actions/getCurrentUser";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new NextResponse("Invalid Credentials", {
        status: 401,
      });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId != "string") {
      throw new NextResponse("Invalid Listing Id", {
        status: 404,
      });
    }

    const listing = await prisma?.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
