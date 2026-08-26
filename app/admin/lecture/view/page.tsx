import { LecturesView } from "@/components/admin/lecture/lectures-view";
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
