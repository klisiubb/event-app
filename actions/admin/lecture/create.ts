"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { TopicFormSchema, TopicFormSchemaType } from "@/schemas/admin/topic";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateLecture(
  data: TopicFormSchemaType
): Promise<ActionReturnType> {
  let lecture;
  try {
    await TopicFormSchema.parseAsync(data);

    lecture = await prisma.lecture.create({
      data: {
        topic: data.topic,
      },
    });
  } catch (e) {
    if (e instanceof ZodError) {
      return {
        status: 400,
        message: `${e.message}`,
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
    status: 201,
    message: "Lecture created. Redirecting...",
  };
}
