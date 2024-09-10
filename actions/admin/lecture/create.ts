"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateLecture({
  topic,
}: {
  topic: string;
}): Promise<ActionReturnType> {
  let lecture;
  try {
    await LectureFormSchema.pick({ topic: true }).parseAsync({ topic });

    lecture = await prisma.lecture.create({
      data: {
        topic,
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
          message: "Lecture with this topic already exist.",
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
    id: lecture?.id,
    status: 201,
    message: "Lecture created. Redirecting...",
  };
}
