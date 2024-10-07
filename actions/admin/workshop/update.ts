"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { Workshop, Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateWorkshop(
  id: string,
  data: Partial<Workshop>
): Promise<ActionReturnType> {
  try {
    await WorkshopFormSchema.partial().safeParseAsync(data);

    await prisma.workshop.update({
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
    message: "Workshop updated! Refreshing...",
  };
}
