"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { RewardFormSchema } from "@/schemas/admin/reward";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function CreateReward({
  name,
}: {
  name: string;
}): Promise<ActionReturnType> {
  let reward;
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
    await RewardFormSchema.pick({ name: true }).parseAsync({ name });

    reward = await prisma.reward.create({
      data: {
        name,
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
          message: "Reward with this name  already exists.",
        };
      }
    } else {
      return {
        status: 400,
        message: "Error. Try again later.",
      };
    }
  }

  if (!reward) {
    return {
      status: 500,
      message: "Reward creation failed.",
    };
  }
  return {
    id: reward.id,
    status: 201,
    message: "Reward created. Redirecting...",
  };
}
