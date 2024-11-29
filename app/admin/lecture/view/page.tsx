import { LecturesView } from "@/components/admin/lecture/lectures-view";
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
  const lectures = await prisma.lecture.findMany({
    include: { qrcode: true },
  });
  if (!lectures) {
    return <></>;
  }

  return (
    <>
      <LecturesView lectures={lectures} />
    </>
  );
};

export default Page;
