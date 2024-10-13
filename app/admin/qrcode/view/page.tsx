import { QRCodesView } from "@/components/admin/qrcode/qrcodes-view";
import { prisma } from "@/lib/db";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
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
