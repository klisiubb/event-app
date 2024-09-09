"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function DeleteLecture(id: string): Promise<ActionReturnType> {
  console.log(id);
  try {
    await prisma.lecture.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2001") {
        return {
          message: "This lecture couldn't be found in the database.",
          status: 400,
        };
      }
      return {
        message: "Database error",
        status: 400,
      };
    }
  }
  return {
    message: "Lecture deleted successfully.",
    status: 200,
  };
}
