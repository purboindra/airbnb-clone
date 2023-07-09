interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  const { listingId } = params;
  try {
    const listingById = await prisma?.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listingById) return null;

    return {
      ...listingById,
      createdAt: listingById.createdAt.toISOString(),
      user: {
        ...listingById.user,
        createdAt: listingById.user.createdAt.toISOString(),
        updatedAt: listingById.user.updatedAt.toISOString(),
        emailVerified: listingById.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    console.log(`ERROR GET LISTING BY ID`, error);
    throw new Error(error);
  }
}
