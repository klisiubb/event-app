"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { UserFormSchema } from "@/schemas/admin/user";
import { UserLW } from "@/types/user.type";
import { Prisma, Role } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateUser(
  id: string,
  data: Partial<UserLW>
): Promise<ActionReturnType> {
  try {
    await UserFormSchema.partial().safeParseAsync(data);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        status: 400,
        message: `User not found.`,
      };
    }
    console.log(data);

    if (data.role) {
      if (user.role === Role.USER && data.role !== Role.USER) {
        await prisma.user.update({
          where: { id },
          data: {
            role: data.role,
            workshopToAttendId: null,
          },
        });
      }
      if (user.role === Role.LECTURER && data.role !== Role.LECTURER) {
        await prisma.user.update({
          where: { id },
          data: {
            role: data.role,
            workshopToLecture: { set: [] },
            lectureToLecture: { set: [] },
          },
        });
      }
    }

    if (data.lectureToLecture) {
      await prisma.user.update({
        where: { id },
        data: {
          lectureToLecture: {
            set: data.lectureToLecture.map((lecture) => ({
              id: lecture.id,
            })),
          },
        },
      });
    }

    if (data.workshopToLecture) {
      await prisma.user.update({
        where: { id },
        data: {
          workshopToLecture: {
            set: data.workshopToLecture.map((workshop) => ({
              id: workshop.id,
            })),
          },
        },
      });
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await prisma.user.update({
      where: { id },
      data: filteredData,
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
        message: `Database error. ${e.message}`,
      };
    }
  }

  return {
    id,
    status: 200,
    message: "User updated! Refreshing...",
  };
}
