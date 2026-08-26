import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";
import { auth } from "@/lib/auth";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      workshopToAttend: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200, headers: corsHeaders });
}
