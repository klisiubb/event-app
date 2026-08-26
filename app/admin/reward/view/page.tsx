import { RewardsView } from "@/components/admin/reward/rewards-view";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await requireAdmin();
  if (!session) {
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
