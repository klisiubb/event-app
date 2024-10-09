import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import PublishButton from "@/components/admin/form/publish-button";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";

import { UpdateQRcode } from "@/actions/admin/qrcode/update";
import { DeleteQRCode } from "@/actions/admin/qrcode/delete";
import QRCodeView from "@/components/admin/qrcode/qrcode-view";
import { QRCodeEditView } from "@/components/admin/qrcode/edit-view";

const Page = async ({ params }: { params: { qrcodeId: string } }) => {
  const { qrcodeId } = params;
  const qrcode = await prisma.qrCode.findUnique({
    where: { id: qrcodeId },
  });
  if (!qrcode) {
    notFound();
  }
  const requiredFields = [qrcode.name, qrcode.value];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = Boolean(completedFields === totalFields);
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          QRCode setup
        </h1>
        {!isCompleted ? (
          <>
            <p className="text-base pt-2 font-bold">
              Please complete all fields {completionText}
            </p>
          </>
        ) : (
          <>
            <p className="text-base pt-2 font-bold">You&apos;re all set!</p>
            {qrcode.isPublished ? (
              <>
                <p className="text-sm pt-2 text-zinc-400">
                  To edit this QRCode you have to unpublish it first.
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/qrcode/view" />
        {isCompleted ? (
          <>
            <PublishButton
              isPublished={qrcode.isPublished}
              objectId={qrcodeId}
              updateAction={UpdateQRcode}
              objectName="qrcode"
            />
          </>
        ) : (
          <></>
        )}
        <DeleteDialog
          route="qrcode"
          id={qrcode.id}
          text="this QRCode"
          deleteAction={DeleteQRCode}
          buttonText="Delete"
        />
      </div>
      {qrcode.isPublished ? (
        <>
          <QRCodeView qrcode={qrcode} />
        </>
      ) : (
        <>
          <QRCodeEditView qrcode={qrcode} />
        </>
      )}
    </div>
  );
};

export default Page;
