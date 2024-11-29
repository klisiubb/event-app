import { RewardsView } from "@/components/admin/reward/rewards-view";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { getUser, getRoles } = getKindeServerSession();
  const userKinde = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !userKinde) {
    return redirect("/");
  }
  const rewards = await prisma.reward.findMany({});

  if (!rewards) {
    return <></>;
  }

  return (
    <>
      <RewardsView rewards={rewards} />
    </>
  );
};

export default Page;
