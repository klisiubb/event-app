import { CalendarIcon, ClockIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Workshop } from "@prisma/client";
import { formatDate, formatTime } from "@/lib/format-date-time";

export default function WorkshopView({ workshop }: { workshop: Workshop }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {workshop.imageUrl ? (
            <Image
              src={workshop.imageUrl}
              alt={workshop.topic}
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
            {workshop.topic}
          </h2>
          <p className="text-center text-muted-foreground">
            {workshop.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm border-t pt-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {workshop.startDate
                ? formatDate(workshop.startDate)
                : "Date not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <ClockIcon className="w-4 h-4" />
            <span>
              {workshop.startDate && workshop.endDate
                ? formatTime(workshop.startDate, workshop.endDate)
                : "Time not yet set"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
