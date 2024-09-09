import React, { FC } from "react";
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
import { Edit } from "lucide-react";

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{lecture.topic}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {lecture.room ? (
          <img
            src={lecture.topic}
            alt={lecture.topic}
            className="w-full h-40 object-cover mb-2 rounded"
          />
        ) : (
          "Image not set."
        )}

        <p>
          <strong>Teacher:</strong> {lecture.topic}
        </p>
        <p>
          <strong>Room:</strong> {lecture.room}
        </p>
        <p>
          <strong>Date:</strong> {lecture.topic}
        </p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild className="flex items-center gap-2  hover:font-bol">
          <Link href={`/admin/lecture/edit/${lecture.id}`}>
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
