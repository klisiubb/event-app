import { QRCodesView } from "@/components/admin/qrcode/qrcodes-view";
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
