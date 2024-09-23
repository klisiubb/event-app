import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { EditView } from "../../../../../components/admin/lecture/edit-view";
import PublishButton from "@/components/admin/form/publish-button";
import { UpdateLecture } from "@/actions/admin/lecture/update";
import GoBackButton from "@/components/admin/go-back-button";
import LectureView from "@/components/admin/lecture/lecture-view";
import DeleteDialog from "@/components/admin/delete-dialog";
import { DeleteLecture } from "@/actions/admin/lecture/delete";

const Page = async ({ params }: { params: { lectureId: string } }) => {
  const { lectureId } = params;
  const lecture = await prisma.lecture.findUnique({
    where: { id: lectureId },
  });
  if (!lecture) {
    notFound();
  }
  const requiredFields = [
    lecture.topic,
    lecture.description,
    lecture.imageUrl,
    lecture.startDate,
    lecture.endDate,
    lecture.room,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = Boolean(completedFields === totalFields);
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Lecture setup
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
            {lecture.isPublished ? (
              <>
                <p className="text-sm pt-2 text-zinc-400">
                  To edit this lecture you have to unpublish it first.
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/lecture/view" />
        {isCompleted ? (
          <>
            <PublishButton
              isPublished={lecture.isPublished}
              objectId={lectureId}
              updateAction={UpdateLecture}
              objectName="lecture"
            />
          </>
        ) : (
          <></>
        )}
        <DeleteDialog
          route="lecture"
          id={lecture.id}
          text="this lecture"
          deleteAction={DeleteLecture}
          buttonText="Delete"
        />
      </div>
      {lecture.isPublished ? (
        <>
          <LectureView lecture={lecture} />
        </>
      ) : (
        <>
          <EditView lecture={lecture} />
        </>
      )}
    </div>
  );
};

export default Page;
