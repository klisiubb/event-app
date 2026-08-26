import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { corsHeaders } from "../../options";
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

  const userToScan = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userToScan) {
    return NextResponse.json(
      { message: "User not found!" },
      { headers: corsHeaders, status: 404 }
    );
  }

  if (userToScan.role !== Role.USER) {
    return NextResponse.json(
      { message: "This user shouldn't be scanned." },
      { headers: corsHeaders, status: 400 }
    );
  }
  if (userToScan.isPresentAtEvent === true) {
    return NextResponse.json(
      { message: "Already scanned." },
      { headers: corsHeaders, status: 400 }
    );
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isPresentAtEvent: true,
    },
  });
  return NextResponse.json(
    { message: "Presence confirmed!" },
    { headers: corsHeaders, status: 200 }
  );
}
