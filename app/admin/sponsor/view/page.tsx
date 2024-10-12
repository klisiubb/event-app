import { prisma } from "@/lib/db";
import React from "react";

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
