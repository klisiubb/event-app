import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const rewards = await prisma.reward.findMany({
    where: {
      isPublished: true,
    },
  });

  if (rewards.length === 0)
    return NextResponse.json(
      { message: "Currently there are no rewards published!" },
      { status: 404 }
    );

  return NextResponse.json(rewards, { status: 200, headers: corsHeaders });
}
