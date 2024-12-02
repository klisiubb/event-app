"use client";

import { useMemo, useRef } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Clock, Building, Users } from "lucide-react";
import Image from "next/image";
import { LectureWithLecturers } from "@/types/lecture-types";
import { WorkshopWithLectures } from "@/types/workshop-types";

type AgendaProps = {
  data: (LectureWithLecturers | WorkshopWithLectures)[];
};

export default function Agenda({ data }: AgendaProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const groupedSessions = useMemo(() => {
    return data.reduce((acc, session) => {
      if (session.startDate) {
        const date = format(new Date(session.startDate), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(session);
      }
      return acc;
    }, {} as Record<string, (LectureWithLecturers | WorkshopWithLectures)[]>);
  }, [data]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedSessions).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [groupedSessions]);

  return (
    <div className="w-full">
      {sortedDates.map((date) => (
        <div key={date} className="mb-12">
          <TypingAnimation
            text={format(new Date(date), "EEEE, MMMM d, yyyy")}
            className="text-2xl font-semibold mb-6 text-center mt-8 text-primary"
            duration={25}
          />
          <div className="relative">
            <div
              ref={timelineRef}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-px 2xl:w-[5px] bg-muted-foreground/50 hidden lg:block"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
            </div>
            {groupedSessions[date]
              .sort((a, b) => {
                const dateA = new Date(a.startDate!).getTime();
                const dateB = new Date(b.startDate!).getTime();
                return dateA - dateB;
              })
              .map((session, index) => (
                <BlurFade inView delay={0.1} key={session.id}>
                  <SessionCard session={session} isEven={index % 2 === 0} />
                </BlurFade>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SessionCard({
  session,
  isEven,
}: {
  session: LectureWithLecturers | WorkshopWithLectures;
  isEven: boolean;
}) {
  const sessionStartDate = new Date(session.startDate!);

  return (
    <Card
      className={`w-full md:max-w-[calc(50%-2rem)] shadow-lg shadow-primary ${
        isEven ? "md:mr-auto" : "md:ml-auto"
      }`}
    >
      <CardContent className="p-6">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } justify-between items-start gap-6`}
        >
          {session.imageUrl && (
            <Image
              src={session.imageUrl}
              alt={session.topic}
              className="w-full md:w-48 h-48 object-contain rounded"
              width={500}
              height={500}
            />
          )}
          <div className="flex-grow">
            <h4 className="text-xl font-semibold mb-2">{session.topic}</h4>
            {session.description && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 hover:line-clamp-none cursor-pointer transition-all duration-300">
                {session.description}
              </p>
            )}
            <div className="flex items-center text-sm mb-2">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-bold">
                {format(sessionStartDate, "h:mm a")}
              </span>
            </div>
            {session.room && (
              <div className="flex items-center text-sm text-muted-foreground font-bold mb-2">
                <Building className="w-4 h-4 mr-2" />
                {session.room}
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground font-bold">
              <Users className="w-4 h-4 mr-2" />
              {session.lecturers.length
                ? session.lecturers.map((lecturer, i) => (
                    <span key={lecturer.id}>
                      {lecturer.firstName} {lecturer.lastName}
                      {i < session.lecturers.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "TBA"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
