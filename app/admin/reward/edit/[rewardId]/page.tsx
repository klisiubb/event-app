import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import PublishButton from "@/components/admin/form/publish-button";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";
import { UpdateReward } from "@/actions/admin/reward/update";
import { DeleteReward } from "@/actions/admin/reward/delete";
import RewardView from "@/components/admin/reward/reward-view";
import { RewardEditView } from "@/components/admin/reward/edit-view";

const Page = async ({ params }: { params: { rewardId: string } }) => {
  const { rewardId } = params;
  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
  });
  if (!reward) {
    notFound();
  }
  const requiredFields = [
    reward.name,
    reward.description,
    reward.imageUrl,
    reward.quantity,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = Boolean(completedFields === totalFields);
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Reward setup
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
            {reward.isPublished ? (
              <>
                <p className="text-sm pt-2 text-zinc-400">
                  To edit this Reward you have to unpublish it first.
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/reward/view" />
        {isCompleted ? (
          <>
            <PublishButton
              isPublished={reward.isPublished}
              objectId={rewardId}
              updateAction={UpdateReward}
              objectName="reward"
            />
          </>
        ) : (
          <></>
        )}
        <DeleteDialog
          route="reward"
          id={reward.id}
          text="this Reward"
          deleteAction={DeleteReward}
          buttonText="Delete"
        />
      </div>
      {reward.isPublished ? (
        <>
          <RewardView reward={reward} />
        </>
      ) : (
        <>
          <RewardEditView reward={reward} />
        </>
      )}
    </div>
  );
};

export default Page;
