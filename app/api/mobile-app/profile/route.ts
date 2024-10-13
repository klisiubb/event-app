import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { corsHeaders } from "../options";
import * as jwt from "jsonwebtoken";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1] as string;

  if (!token) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }

  let decoded = jwt.decode(token, { complete: true });

  const user = await prisma.user.findUnique({
    where: {
      id: decoded?.payload.sub as string,
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
