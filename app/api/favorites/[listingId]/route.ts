import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new NextResponse("Invalid User", {
        status: 401,
      });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new NextResponse("Invalid Listring ID", {
        status: 404,
      });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error: any) {
    console.log("ERROR FAVORITE", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new NextResponse("Invalid User Id", {
        status: 401,
      });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new NextResponse("Invalid Listing ID", {
        status: 404,
      });
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR FAVORITE", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
