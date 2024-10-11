"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { UserFormSchema } from "@/schemas/admin/user";
import { Prisma, User } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateUser(
  id: string,
  data: Partial<User>
): Promise<ActionReturnType> {
  try {
    await UserFormSchema.partial().safeParseAsync(data);

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
