import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const workshops = await prisma.workshop.findMany({
    where: {
      isPublished: true,
    },
  });

  if (workshops.length === 0)
    return NextResponse.json(
      { message: "Currently there are no workshops published!" },
      { status: 404 }
    );

  return NextResponse.json(workshops, { status: 200, headers: corsHeaders });
}
