"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";

export async function DeleteWorkshop(id: string): Promise<ActionReturnType> {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
    return {
      message: "Not authorized.",
      status: 401,
    };
  }
  try {
    await prisma.workshop.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2001") {
        return {
          message: "This workshop couldn't be found in the database.",
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
    message: "Workshop deleted successfully.",
    status: 200,
  };
}
