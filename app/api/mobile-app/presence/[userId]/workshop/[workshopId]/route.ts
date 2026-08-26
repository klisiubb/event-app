import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { corsHeaders } from "@/app/api/mobile-app/options";
import { auth } from "@/lib/auth";

export async function GET(req: Request, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const { userId } = params;

  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }

  //Scanner volunteer
  const volunteer = await prisma.user.findUnique({
    where: {
      id: session.user.id,
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
