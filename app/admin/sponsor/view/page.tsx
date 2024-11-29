import { SponsorsView } from "@/components/admin/sponsor/sponsors-view";
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
