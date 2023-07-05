import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();

    const {
      title,
      description,
      imageSource,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        throw new NextResponse(`Missing fields ${body[value]}`, {
          status: 401,
        });
      }
    });

    const listings = await prisma?.listing.create({
      data: {
        title,
        description,
        imageSource: imageSource,
        category,
        roomCount,
        bathroomCount: bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listings, {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR POST LISTING", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
