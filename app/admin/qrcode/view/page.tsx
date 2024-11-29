import { QRCodesView } from "@/components/admin/qrcode/qrcodes-view";
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
  const qrcodes = await prisma.qrCode.findMany({
    where: {
      AND: [{ lecture: null }, { workshop: null }],
    },
  });

  if (!qrcodes) {
    return <></>;
  }

  return (
    <>
      <QRCodesView qrcodes={qrcodes} />
    </>
  );
};

export default Page;
