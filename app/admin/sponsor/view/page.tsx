import { SponsorsView } from "@/components/admin/sponsor/sponsors-view";
import { prisma } from "@/lib/db";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const sponsors = await prisma.sponsor.findMany({
    include: {
      qrCode: true,
    },
  });

  if (!sponsors) {
    return <></>;
  }

  return (
    <>
      <SponsorsView sponsors={sponsors} />
    </>
  );
};

export default Page;
