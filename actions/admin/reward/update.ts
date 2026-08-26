"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { RewardFormSchema } from "@/schemas/admin/reward";
import { requireAdmin } from "@/lib/auth";
import { Prisma, Reward } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateReward(
  id: string,
  data: Partial<Reward>
): Promise<ActionReturnType> {
  try {
    const session = await requireAdmin();
    if (!session) {
      return {
        message: "Not authorized.",
        status: 401,
      };
    }
    await RewardFormSchema.partial().safeParseAsync(data);

    await prisma.reward.update({
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
    message: "Reward updated! Refreshing...",
  };
}
