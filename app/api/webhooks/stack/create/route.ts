import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

//TODO proper implementation, this is just for testing!!!

const SVIX_WEBHOOK_SIGNING_SECRET = process.env.SVIX_WEBHOOK_SIGNING_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key, parent) => {
    headers[key] = value;
  });

  const wh = new Webhook(SVIX_WEBHOOK_SIGNING_SECRET);

  let payload: any = {};

  try {
    payload = wh.verify(body, headers);
  } catch (e) {
    return NextResponse.json(
      { error: `Unable to verify webhook: ${(e as Error).message}` },
      { status: 500 }
    );
  }

  if (payload.type === "user.created") {
    const data = payload.data;

    await prisma.user.create({
      data: {
        id: data.id,
        email: data.primary_email,
        firstName: data.display_name,
        lastName: data.display_name,
      },
    });

    return NextResponse.json({ message: "Webhook received" });
  }
}
