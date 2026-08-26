import { WorkshopsView } from "@/components/admin/workshop/workshops-view";
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
  const workshops = await prisma.workshop.findMany({
    include: {
      qrcode: true,
    },
  });

  if (!workshops) {
    return <></>;
  }

  return (
    <>
      <WorkshopsView workshops={workshops} />
    </>
  );
};

export default Page;
