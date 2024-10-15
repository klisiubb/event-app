"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { UserFormSchema } from "@/schemas/admin/user";
import { Prisma, Role, User } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateUser(
  id: string,
  data: Partial<User>
): Promise<ActionReturnType> {
  try {
    await UserFormSchema.partial().safeParseAsync(data);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return {
        status: 400,
        message: `User not found.`,
      };
    }

    //TODO this need testing
    if (data.role) {
      if (user.role == Role.USER && data.role !== Role.USER) {
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            role: data.role,
            workshopToAttendId: null,
          },
        });
      }
      if (user.role == Role.LECTURER && data.role !== Role.LECTURER) {
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            role: data.role,
            workshopToLectureId: null,
            lectureToLectureId: null,
          },
        });
      }
    }

    await prisma.user.update({
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
    message: "User updated! Refreshing...",
  };
}
