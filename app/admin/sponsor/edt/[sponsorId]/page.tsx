import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import PublishButton from "@/components/admin/form/publish-button";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";
import { SponsorEditView } from "@/components/admin/sponsor/edit-view";

import { UpdateSponsor } from "@/actions/admin/sponsor/update";
import { DeleteSponsor } from "@/actions/admin/sponsor/delete";
import SponsorView from "@/components/admin/sponsor/sponsor-view";
const Page = async ({ params }: { params: { sponsorId: string } }) => {
  const { sponsorId } = params;
  const sponsor = await prisma.sponsor.findUnique({
    where: { id: sponsorId },
  });
  if (!sponsor) {
    notFound();
  }
  const requiredFields = [sponsor.name, sponsor.description, sponsor.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = Boolean(completedFields === totalFields);
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Sponsor setup
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
            {sponsor.isPublished ? (
              <>
                <p className="text-sm pt-2 text-zinc-400">
                  To edit this sponsor you have to unpublish it first.
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/sponsor/view" />
        {isCompleted ? (
          <>
            <PublishButton
              isPublished={sponsor.isPublished}
              objectId={sponsorId}
              updateAction={UpdateSponsor}
              objectName="sponsor"
            />
          </>
        ) : (
          <></>
        )}
        <DeleteDialog
          route="sponsor"
          id={sponsor.id}
          text="this sponsor"
          deleteAction={DeleteSponsor}
          buttonText="Delete"
        />
      </div>
      {sponsor.isPublished ? (
        <>
          <SponsorView sponsor={sponsor} />
        </>
      ) : (
        <>
          <SponsorEditView sponsor={sponsor} />
        </>
      )}
    </div>
  );
};

export default Page;
