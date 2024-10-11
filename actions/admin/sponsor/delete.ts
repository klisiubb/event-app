"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function DeleteSponsor(id: string): Promise<ActionReturnType> {
  try {
    await prisma.sponsor.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2001") {
        return {
          message: "This sponsor couldn't be found in the database.",
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
    message: "Sponsor deleted successfully.",
    status: 200,
  };
}
