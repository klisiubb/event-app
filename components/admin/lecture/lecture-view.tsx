import { CalendarIcon, ClockIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lecture } from "@prisma/client";
import { formatDate, formatTime } from "@/lib/format-date-time";

export default function LectureView({ lecture }: { lecture: Lecture }) {
  return (
    <Card className="max-w-4xl mx-auto mt-16 md:mt-4">
      <CardContent className="space-y-6 pt-6">
        <div className="relative w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-lg">
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

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-primary">{lecture.topic}</h2>
          <p className="text-muted-foreground">
            {lecture.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex justify-center gap-6 text-sm">
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
      </CardContent>
    </Card>
  );
}
