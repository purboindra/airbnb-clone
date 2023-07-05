import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR REGISTER USER", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
