import { RewardsView } from "@/components/admin/reward/rewards-view";
import { prisma } from "@/lib/db";
import React from "react";

const Page = async () => {
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
