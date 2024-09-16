import { DeleteLecture } from "@/actions/admin/lecture/delete";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import {
  CalendarIcon,
  ClockIcon,
  SlidersHorizontal,
  Undo2Icon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { EditView } from "./edit-view";
import PublishButton from "@/components/admin/form/publish-button";
import { UpdateLecture } from "@/actions/admin/lecture/update";
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
      <div>
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
          <Card className="w-full max-w-2xl mx-auto overflow-hidden">
            <CardHeader className="relative">
              <CardTitle className="text-3xl font-bold text-center text-primary">
                {lecture.topic}
              </CardTitle>
              <p className="mt-2 text-sm text-center text-muted-foreground">
                {lecture.description}
              </p>
            </CardHeader>
            <CardContent className="relative space-y-6">
              {lecture.imageUrl && (
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <Image
                    src={lecture.imageUrl}
                    fill
                    alt={lecture.topic}
                    className="transition-transform duration-300 hover:scale-105 object-cover"
                  />
                </div>
              )}
              <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>
                    {lecture.startDate?.toLocaleString("pl-PL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>
                    {lecture.startDate?.toLocaleString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    {" - "}
                    {lecture.endDate?.toLocaleString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="relative flex justify-center space-x-4">
              <Button asChild variant="outline" className="w-32">
                <Link
                  href="/admin/lecture/view"
                  className="flex items-center justify-center"
                >
                  <Undo2Icon className="w-4 h-4 mr-2" />
                  Go back
                </Link>
              </Button>
              <DeleteDialog
                route="lecture"
                id={lecture.id}
                text="this lecture"
                deleteAction={DeleteLecture}
                buttonText="Delete"
              />
            </CardFooter>
          </Card>
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
