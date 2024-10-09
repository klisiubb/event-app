"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
var QRCode = require("qrcode");

export async function CreateWorkshop({
  topic,
}: {
  topic: string;
}): Promise<ActionReturnType> {
  let workshop;
  let qrcode;
  let base64;
  let value = Number(process.env.APP_Workshop_POINTS_VALUE) || 10;
  let maxAttenders =
    Number(process.env.APP_WORKSHOP_MAXIMUM_PARTICIPANTS_VALUE) || 15;

  try {
    await WorkshopFormSchema.pick({ topic: true }).parseAsync({ topic });

    qrcode = await prisma.qrCode.create({
      data: {
        name: topic,
        value,
      },
    });

    workshop = await prisma.workshop.create({
      data: { topic, maxAttenders, qrcode: { connect: { id: qrcode.id } } },
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
          message: "Workshop with this topic already exists.",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }

  if (!workshop) {
    return {
      status: 500,
      message: "Workshop creation failed.",
    };
  }

  try {
    base64 = await QRCode.toDataURL(workshop.id);

    if (!qrcode) {
      return {
        status: 500,
        message: "QR code creation failed.",
      };
    }

    await prisma.qrCode.update({
      where: {
        id: qrcode.id,
      },
      data: {
        base64,
      },
    });
  } catch (e) {
    return {
      status: 500,
      message: "Error generating QR code.",
    };
  }

  return {
    id: workshop.id,
    status: 201,
    message: "Workshop created. Redirecting...",
  };
}
