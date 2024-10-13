import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const lectures = await prisma.lecture.findMany({
    where: {
      isPublished: true,
    },
  });

  if (lectures.length === 0)
    return NextResponse.json(
      { message: "Currently there are no lectures published!" },
      { status: 404 }
    );

  return NextResponse.json(lectures, { status: 200, headers: corsHeaders });
}
