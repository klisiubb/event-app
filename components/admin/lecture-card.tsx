import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Lecture } from "@prisma/client";
import DeleteDialog from "./delete-dialog";
import { DeleteLecture } from "@/actions/admin/lecture/delete";
import { Button } from "../ui/button";
import Link from "next/link";
import { CalendarIcon, ClockIcon, Edit, ImageIcon } from "lucide-react";
import { formatDate, formatTime } from "@/lib/format-date-time";
import Image from "next/image";

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
          {lecture.topic}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pb-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {lecture.imageUrl ? (
            <Image
              src={lecture.imageUrl}
              alt={lecture.topic}
              className="transition-transform duration-300 hover:scale-105 object-cover"
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="sr-only">Image not yet set</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {lecture.description || "Description not yet set"}
        </p>

        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {lecture.startDate
                ? formatDate(lecture.startDate)
                : "Date not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {lecture.startDate && lecture.endDate
                ? formatTime(lecture.startDate, lecture.endDate)
                : "Time not yet set"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="flex-1">
          <Link
            href={`/admin/lecture/edit/${lecture.id}`}
            className="flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteDialog
          route="lecture"
          id={lecture.id}
          buttonText="Delete"
          text="this lecture"
          deleteAction={DeleteLecture}
        />
      </CardFooter>
    </Card>
  );
};

export default LectureCard;
