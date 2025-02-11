"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { QRCodeFormSchema } from "@/schemas/admin/qrcode";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
var QRCode = require("qrcode");
export async function CreateQRCode({
  name,
}: {
  name: string;
}): Promise<ActionReturnType> {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
    return {
      message: "Not authorized.",
      status: 401,
    };
  }
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

  let base64 = await QRCode.toDataURL(qrcode?.id);
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
