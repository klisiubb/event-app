"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
var QRCode = require("qrcode");

export async function CreateLecture({
  topic,
}: {
  topic: string;
}): Promise<ActionReturnType> {
  let lecture;
  let qrcode;
  let base64;
  let value = Number(process.env.APP_LECTURE_POINTS_VALUE) || 10;

  try {
    await LectureFormSchema.pick({ topic: true }).parseAsync({ topic });

    qrcode = await prisma.qrCode.create({
      data: {
        name: topic,
        value,
      },
    });

    lecture = await prisma.lecture.create({
      data: { topic, qrcode: { connect: { id: qrcode.id } } },
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
          message: "Lecture with this topic already exists.",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }

  if (!lecture) {
    return {
      status: 500,
      message: "Lecture creation failed.",
    };
  }

  try {
    base64 = await QRCode.toDataURL(lecture.id);

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
    id: lecture.id,
    status: 201,
    message: "Lecture created. Redirecting...",
  };
}
