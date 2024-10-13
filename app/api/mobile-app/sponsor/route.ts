import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const sponsors = await prisma.sponsor.findMany({
    where: {
      isPublished: true,
    },
  });

  if (sponsors.length === 0)
    return NextResponse.json(
      { message: "Currently there are no sponsors published!" },
      { status: 404 }
    );

  return NextResponse.json(sponsors, { status: 200, headers: corsHeaders });
}
