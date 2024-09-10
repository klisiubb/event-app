import { DeleteLecture } from "@/actions/admin/lecture/delete";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { SlidersHorizontal, Undo2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { TopicForm } from "../../_components/topic-form";
import { DescriptionForm } from "../../_components/description-form";
import { RoomForm } from "../../_components/room-form";
import { StartDateForm } from "../../_components/start-date-form";
import { EndDateForm } from "../../_components/end-date-form";
const Page = async ({ params }: { params: { lectureId: string } }) => {
  const { lectureId } = params;
  const lecture = await prisma.lecture.findUnique({
    where: { id: lectureId },
  });
  if (!lecture) {
    notFound();
  }
  const requiredFields = [lecture.topic, lecture.description, lecture.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

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
      <p className="text-sm pt-4 font-bold">
        Please complete all fields {completionText}
      </p>
      {lecture.isPublished ? "Retract to edit" : "Edit"}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <TopicForm topic={lecture.topic} lectureId={lecture.id} />
        <RoomForm room={lecture.room} lectureId={lecture.id} />
        <StartDateForm startDate={lecture.startDate} lectureId={lecture.id} />
        <EndDateForm endDate={lecture.endDate} lectureId={lecture.id} />
        <DescriptionForm
          description={lecture.description}
          lectureId={lecture.id}
        />
        <Button asChild className="flex items-center gap-2 hover:font-bold">
          <Link href="/admin/lecture/view">
            {" "}
            <Undo2 className="h-4 w-4" /> Go back
          </Link>
        </Button>
        <DeleteDialog
          route="lecture"
          id={lecture.id}
          buttonText="Delete"
          text="this lecture"
          deleteAction={DeleteLecture}
        />
      </div>
    </div>
  );
};

export default Page;
