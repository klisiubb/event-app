import { CalendarIcon, ClockIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lecture } from "@prisma/client";
import { formatDate, formatTime } from "@/lib/format-date-time";

export default function LectureView({ lecture }: { lecture: Lecture }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
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
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="sr-only">Image not yet set</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-primary">
            {lecture.topic}
          </h2>
          <p className="text-center text-muted-foreground">
            {lecture.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm border-t pt-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {lecture.startDate
                ? formatDate(lecture.startDate)
                : "Date not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <ClockIcon className="w-4 h-4" />
            <span>
              {lecture.startDate && lecture.endDate
                ? formatTime(lecture.startDate, lecture.endDate)
                : "Time not yet set"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
