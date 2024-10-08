"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import QRCode from "easyqrcodejs-nodejs";

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
  var options = {
    CorrectLevel: QRCode.CorrectLevel.H,
    width: 2048,
    height: 2048,
    text: qrcode?.id,
    //logo: "https://utfs.io/f/eafed944-abd4-49e8-9155-2a0d5e8e90d6-dwktz.png",
  };
  let qrCode = await new QRCode(options);
  let base64 = await qrCode.toDataURL();

  await prisma.qrCode.update({
    where: { id: qrcode?.id },
    data: { base64 },
  });

  return {
    id: qrcode?.id,
    status: 201,
    message: "QRCode created. Redirecting...",
  };
}
