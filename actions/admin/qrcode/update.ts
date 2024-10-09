"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { Prisma, QrCode } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateQRcode(
  id: string,
  data: Partial<QrCode>
): Promise<ActionReturnType> {
  try {
    await QRCodeFormSchema.partial().safeParseAsync(data);

    await prisma.qrCode.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 400,
        message: `${e.issues[0].message}`,
      };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        status: 400,
        message: `Database error.${e.message}`,
      };
    }
  }
  return {
    id,
    status: 200,
    message: "QRCode updated! Refreshing...",
  };
}
