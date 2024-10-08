import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Workshop } from "@prisma/client";
import DeleteDialog from "../delete-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  Edit,
  ImageIcon,
  MapPinIcon,
  Users,
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/format-date-time";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteWorkshop } from "@/actions/admin/workshop/delete";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2 flex-grow pr-2">
            {workshop.topic}
          </CardTitle>
          <Badge variant={workshop.isPublished ? "default" : "destructive"}>
            {workshop.isPublished ? "Published" : "Not Published"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pb-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {workshop.imageUrl ? (
            <Image
              src={workshop.imageUrl}
              alt={workshop.topic}
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

        <div className="min-h-[4.5rem]">
          <p className="text-sm text-muted-foreground line-clamp-3 max-w-[300px] text-center">
            {workshop.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {workshop.startDate
                ? formatDate(workshop.startDate)
                : "Date not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {workshop.startDate && workshop.endDate
                ? formatTime(workshop.startDate, workshop.endDate)
                : "Time not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {workshop.room || "Room not yet set"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {workshop.maxAttenders || "Max attenders not yet set"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="flex-1">
          <Link
            href={`/admin/workshop/edit/${workshop.id}`}
            className="flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteDialog
          route="workshop"
          id={workshop.id}
          buttonText="Delete"
          text="this workshop"
          deleteAction={DeleteWorkshop}
        />
      </CardFooter>
    </Card>
  );
}
