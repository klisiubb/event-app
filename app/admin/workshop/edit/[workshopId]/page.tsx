import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import PublishButton from "@/components/admin/form/publish-button";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";
import { WorkshopEditView } from "@/components/admin/workshop/edit-view";
import WorkshopView from "@/components/admin/workshop/workshop-view";
import { DeleteWorkshop } from "@/actions/admin/workshop/delete";
import { UpdateWorkshop } from "@/actions/admin/workshop/update";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async ({ params }: { params: { workshopId: string } }) => {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
    return redirect("/");
  }
  const { workshopId } = params;
  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
  });
  if (!workshop) {
    notFound();
  }
  const requiredFields = [
    workshop.topic,
    workshop.description,
    workshop.imageUrl,
    workshop.startDate,
    workshop.endDate,
    workshop.room,
    workshop.maxAttenders,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = Boolean(completedFields === totalFields);
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Workshop setup
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
            {workshop.isPublished ? (
              <>
                <p className="text-sm pt-2 text-zinc-400">
                  To edit this workshop you have to unpublish it first.
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/workshop/view" />
        {isCompleted ? (
          <>
            <PublishButton
              isPublished={workshop.isPublished}
              objectId={workshopId}
              updateAction={UpdateWorkshop}
              objectName="workshop"
            />
          </>
        ) : (
          <></>
        )}
        <DeleteDialog
          route="workshop"
          id={workshop.id}
          text="this workshop"
          deleteAction={DeleteWorkshop}
          buttonText="Delete"
        />
      </div>
      {workshop.isPublished ? (
        <>
          <WorkshopView workshop={workshop} />
        </>
      ) : (
        <>
          <WorkshopEditView workshop={workshop} />
        </>
      )}
    </div>
  );
};

export default Page;
