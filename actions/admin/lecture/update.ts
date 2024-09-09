"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { TopicFormSchema } from "@/schemas/admin/topic";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateLecture(
  id: string,
  topic: string
): Promise<ActionReturnType> {
  let lecture;
  try {
    await TopicFormSchema.parseAsync({ topic });

    lecture = await prisma.lecture.update({
      where: {
        id,
      },
      data: {
        topic,
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 400,
        message: `${e.errors[0].message}`,
      };
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          status: 400,
          message: "Lecture with this topic already exist.",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }
  return {
    id: lecture?.id,
    status: 200,
    message: "Lecture updated! Refreshing...",
  };
}
