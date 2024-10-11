"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { SponsorFormSchema } from "@/schemas/admin/sponsor";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
var QRCode = require("qrcode");

export async function CreateSponsor({
  name,
}: {
  name: string;
}): Promise<ActionReturnType> {
  let sponsor;
  let qrcode;
  let base64;
  let value = Number(process.env.APP_SPONSOR_PARTNER_POINTS_VALUE) || 10;

  try {
    await SponsorFormSchema.pick({ name: true }).parseAsync({ name });

    qrcode = await prisma.qrCode.create({
      data: {
        name,
        value,
      },
    });

    sponsor = await prisma.sponsor.create({
      data: { name, qrCode: { connect: { id: qrcode.id } } },
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
          message: "Sponsor with this name already exists.",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }

  if (!sponsor) {
    return {
      status: 500,
      message: "Sponsor creation failed.",
    };
  }

  try {
    base64 = await QRCode.toDataURL(sponsor.id);

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
        isPublished: true,
      },
    });
  } catch (e) {
    return {
      status: 500,
      message: "Error generating QR code.",
    };
  }

  return {
    id: sponsor.id,
    status: 201,
    message: "Sponsor created. Redirecting...",
  };
}
