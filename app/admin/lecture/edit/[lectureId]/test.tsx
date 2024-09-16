import { CalendarIcon, ClockIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lecture } from "@prisma/client";
import { formatDate, formatTime } from "@/lib/format-date-time";
import DeleteDialog from "@/components/admin/delete-dialog";
import { DeleteLecture } from "@/actions/admin/lecture/delete";

export default function SingleLectureView({ lecture }: { lecture: Lecture }) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-3xl font-bold text-primary">{lecture.topic}</h2>
        <p className="text-muted-foreground">
          {lecture.description || "Description not yet set"}
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 relative min-h-[16rem] overflow-hidden rounded-lg">
            {lecture.imageUrl ? (
              <Image
                src={lecture.imageUrl}
                alt={lecture.topic}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
                <span className="sr-only">Image not yet set</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>
                  {lecture.startDate
                    ? formatDate(lecture.startDate)
                    : "Date not yet set"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ClockIcon className="w-5 h-5 text-primary" />
                <span>
                  {lecture.startDate && lecture.endDate
                    ? formatTime(lecture.startDate, lecture.endDate)
                    : "Time not yet set"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <DeleteDialog
            route="lecture"
            id={lecture.id}
            text="this lecture"
            deleteAction={DeleteLecture}
            buttonText="Delete"
          />
        </div>
      </CardContent>
    </Card>
  );
}
