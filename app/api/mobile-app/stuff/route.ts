import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";
import { Role } from "@prisma/client";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const stuff = await prisma.user.findMany({
    where: {
      role: Role.VOLUNTEER,
    },
  });

  if (stuff.length === 0)
    return NextResponse.json(
      { message: "Currently there are no stuff presented!" },
      { status: 404 }
    );

  return NextResponse.json(stuff, { status: 200, headers: corsHeaders });
}
