import { WorkshopsView } from "@/components/admin/workshop/workshops-view";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
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
