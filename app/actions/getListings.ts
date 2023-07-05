import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings || [];
  } catch (error: any) {
    console.log("ERROR GET ALL LISTINGS", error);
    throw new Error(error);
  }
}
