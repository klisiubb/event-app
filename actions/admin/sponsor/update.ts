"use server";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { prisma } from "@/lib/db";
import { SponsorFormSchema } from "@/schemas/admin/sponsor";
import { Prisma, Sponsor } from "@prisma/client";
import { ZodError } from "zod";

export async function UpdateSponsor(
  id: string,
  data: Partial<Sponsor>
): Promise<ActionReturnType> {
  try {
    await SponsorFormSchema.partial().safeParseAsync(data);

    await prisma.sponsor.update({
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
    message: "Sponsor updated! Refreshing...",
  };
}
