import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { corsHeaders } from "@/app/api/mobile-app/options";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  const token = req.headers.get("Authorization")?.split(" ")[1] as string;

  if (!token) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }

  let decoded = jwt.decode(token, { complete: true });
  const decodedSub = decoded?.payload.sub as string;

  //Scanner volunteer
  const volunteer = await prisma.user.findUnique({
    where: {
      id: decodedSub,
    },
  });

  if (!volunteer) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }
  if (volunteer.role !== Role.ADMIN && volunteer.role !== Role.VOLUNTEER) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }

  // User to scan and check if he is present
  const userToScan = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userToScan) {
    return NextResponse.json(
      { message: "User not found." },
      { headers: corsHeaders, status: 404 }
    );
  }

  if (userToScan.role !== Role.USER) {
    return NextResponse.json(
      { message: "This user shouldn't be scanned." },
      { headers: corsHeaders, status: 400 }
    );
  }

  // Not confirmed at event but came for workshop
  if (userToScan.isPresentAtEvent === false) {
    return NextResponse.json(
      {
        message: "Presence not confirmed at event. Do it first.",
      },
      { headers: corsHeaders, status: 400 }
    );
  }

  if (userToScan.workshopToAttendId === null) {
    return NextResponse.json(
      { message: "User is not registered for any workshop." },
      { headers: corsHeaders, status: 400 }
    );
  }

  if (userToScan.isPresentAtWorkshop === true) {
    return NextResponse.json(
      { message: "This user was scanned already." },
      { headers: corsHeaders, status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isPresentAtWorkshop: true,
    },
  });
  return NextResponse.json(
    { message: "Presence at the workshop confirmed." },
    { headers: corsHeaders, status: 200 }
  );
}
