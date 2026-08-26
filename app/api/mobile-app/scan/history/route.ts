import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../../options";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      QrCode: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Access denied." },
      { headers: corsHeaders, status: 401 }
    );
  }
  const scannedQRCodes = await prisma.qrCode.findMany({
    where: {
      scannedBy: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      workshop: true,
      scannedBy: true,
    },
  });
  return NextResponse.json(
    { scannedQRCodes },
    { headers: corsHeaders, status: 200 }
  );
}
