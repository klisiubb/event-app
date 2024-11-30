import { StaffSection } from "@/components/landing-page/staff";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import React from "react";
export const revalidate = 30;
export const dynamic = "force-dynamic";
const Page = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: Role.VOLUNTEER,
    },
  });
  return <StaffSection team={users} />;
};

export default Page;
