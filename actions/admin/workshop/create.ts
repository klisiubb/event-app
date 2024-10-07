"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateWorkshop({
  topic,
}: {
  topic: string;
}): Promise<ActionReturnType> {
  let workshop;
  try {
    await WorkshopFormSchema.pick({ topic: true }).parseAsync({ topic });

    workshop = await prisma.workshop.create({
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
          message: "Workshop with this topic already exist.",
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
    id: workshop?.id,
    status: 201,
    message: "Workshop created. Redirecting...",
  };
}
