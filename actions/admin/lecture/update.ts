"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { requireAdmin } from "@/lib/auth";
import { Lecture, Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateLecture(
  id: string,
  data: Partial<Lecture>
): Promise<ActionReturnType> {
  const session = await requireAdmin();
  if (!session) {
    return {
      message: "Not authorized.",
      status: 401,
    };
  }
  try {
    await LectureFormSchema.partial().safeParseAsync(data);

    await prisma.lecture.update({
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
    message: "Lecture updated! Refreshing...",
  };
}
