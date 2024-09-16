import { prisma } from "@/lib/db";
import { SlidersHorizontal } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { EditView } from "./edit-view";
import PublishButton from "@/components/admin/form/publish-button";
import { UpdateLecture } from "@/actions/admin/lecture/update";
import GoBackButton from "@/components/admin/go-back-button";
import SingleLectureView from "./test";

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-primary">
          <SlidersHorizontal />
          <h1 className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
            Lecture setup
          </h1>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <GoBackButton href="/admin/lecture/view" />
        {isCompleted ? (
          <PublishButton
            isPublished={lecture.isPublished}
            objectId={lectureId}
            updateAction={UpdateLecture}
            objectName="lecture"
          />
        ) : (
          <>
            <p className="text-sm pt-4 font-bold">
              Please complete all fields {completionText}
            </p>
          </>
        )}
      </div>
      {lecture.isPublished ? (
        <>
          <SingleLectureView lecture={lecture} />
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
