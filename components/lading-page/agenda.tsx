"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { format, isSameDay } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Clock, Users } from "lucide-react";
import Image from "next/image";

import { LectureWithLecturers } from "@/types/lecture-types";
import { WorkshopWithLectures } from "@/types/workshop-types";
import { BlurFade } from "../ui/blur-fade";
import { TypingAnimation } from "../ui/typing-animation";

type AgendaProps = {
  lectures: LectureWithLecturers[];
  workshops: WorkshopWithLectures[];
};

export default function Component({ lectures, workshops }: AgendaProps) {
  const [activeTab, setActiveTab] = useState<"lectures" | "workshops">(
    "lectures"
  );
  const timelineRef = useRef<HTMLDivElement>(null);

  const groupedSessions = useMemo(() => {
    const sessions = activeTab === "lectures" ? lectures : workshops;
    return sessions.reduce((acc, session) => {
      if (session.startDate) {
        const date = format(new Date(session.startDate), "yyyy-MM-dd");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(session);
      }
      return acc;
    }, {} as Record<string, (LectureWithLecturers | WorkshopWithLectures)[]>);
  }, [activeTab, lectures, workshops]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedSessions).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [groupedSessions]);

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "lectures" | "workshops")
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>
        <TabsContent value="lectures">
          {renderSessions(
            sortedDates,
            groupedSessions,
            "lectures",
            timelineRef
          )}
        </TabsContent>
        <TabsContent value="workshops">
          {renderSessions(
            sortedDates,
            groupedSessions,
            "workshops",
            timelineRef
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function renderSessions(
  sortedDates: string[],
  groupedSessions: Record<
    string,
    (LectureWithLecturers | WorkshopWithLectures)[]
  >,
  type: "lectures" | "workshops",
  timelineRef: React.RefObject<HTMLDivElement>
) {
  const now = new Date();

  return sortedDates.map((date) => (
    <div key={date} className="mb-12">
      <TypingAnimation
        text={format(new Date(date), "EEEE, MMMM d, yyyy")}
        className="text-2xl font-semibold mb-6 text-center mt-8 text-primary"
        duration={50}
      />
      <div className="relative">
        <div
          ref={timelineRef}
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden lg:block"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
        </div>
        {groupedSessions[date]
          .sort((a, b) => {
            const dateA = a.startDate
              ? new Date(a.startDate).getTime()
              : Infinity;
            const dateB = b.startDate
              ? new Date(b.startDate).getTime()
              : Infinity;
            return dateA - dateB;
          })
          .map((session, index) => {
            const sessionStartDate = new Date(session.startDate!);
            const isCurrentSession =
              sessionStartDate.getFullYear() === now.getFullYear() &&
              sessionStartDate.getMonth() === now.getMonth() &&
              sessionStartDate.getDate() === now.getDate() &&
              sessionStartDate.getHours() === now.getHours() &&
              sessionStartDate.getMinutes() === now.getMinutes();

            return (
              <BlurFade inView delay={0.1} key={session.id}>
                <div className="mb-8 relative">
                  <div
                    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full hidden lg:block ${
                      isCurrentSession ? "animate-ping" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-primary rounded-full"></div>
                  </div>
                  <Card
                    className={`w-full md:max-w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`flex flex-col ${
                          index % 2 === 0
                            ? "md:flex-row"
                            : "md:flex-row-reverse"
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
                          <h4 className="text-xl font-semibold mb-2">
                            {session.topic}
                          </h4>
                          {session.description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 hover:line-clamp-none cursor-pointer transition-all duration-300">
                              {session.description}
                            </p>
                          )}
                          <div className="flex items-center text-sm mb-2">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            {session.startDate && (
                              <span className="text-primary font-bold">
                                {format(new Date(session.startDate), "h:mm a")}
                                {session.endDate &&
                                  !isSameDay(
                                    new Date(session.startDate),
                                    new Date(session.endDate)
                                  ) && (
                                    <>
                                      {" "}
                                      -{" "}
                                      {format(
                                        new Date(session.endDate),
                                        "h:mm a"
                                      )}
                                    </>
                                  )}
                              </span>
                            )}
                          </div>
                          {session.room && (
                            <div className="flex items-center text-sm text-muted-foreground font-bold mb-2">
                              <Building className="w-4 h-4 mr-2" />
                              {session.room}
                            </div>
                          )}
                          <div className="flex items-center text-sm text-muted-foreground font-bold">
                            <Users className="w-4 h-4 mr-2" />
                            {(type === "lectures"
                              ? (session as LectureWithLecturers)
                                  .lectureLecturers
                              : (session as WorkshopWithLectures)
                                  .workshopLecturers
                            )?.length
                              ? (type === "lectures"
                                  ? (session as LectureWithLecturers)
                                      .lectureLecturers
                                  : (session as WorkshopWithLectures)
                                      .workshopLecturers
                                ).map((lecturer, index, array) => (
                                  <span key={lecturer.id}>
                                    {lecturer.firstName} {lecturer.lastName}
                                    {index < array.length - 1 ? ", " : ""}
                                  </span>
                                ))
                              : "TBA"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </BlurFade>
            );
          })}
      </div>
    </div>
  ));
}
