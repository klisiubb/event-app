import { SponsorsView } from "@/components/admin/sponsor/sponsors-view";
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
