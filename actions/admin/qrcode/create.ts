"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateQRCode({
  name,
}: {
  name: string;
}): Promise<ActionReturnType> {
  let qrcode;
  try {
    await QRCodeFormSchema.pick({ name: true }).parseAsync({ name });

    qrcode = await prisma.qrCode.create({
      data: {
        name,
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
      if (e.code === "P2002") {
        return {
          status: 400,
          message: "QRCode creation error.",
        };
      }
    } else {
      console.log(e);
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }
  return {
    id: qrcode?.id,
    status: 201,
    message: "QRCode created. Redirecting...",
  };
}
