import { prisma } from "@/lib/db";
import React from "react";
import Agenda from "@/components/landing-page/agenda";

export const revalidate = 30;
export const dynamic = "force-dynamic";

const Page = async () => {
  const workshops = await prisma.workshop.findMany({
    where: {
      isPublished: true,
    },
    include: {
      workshopLecturers: true,
    },
  });
  const lectures = await prisma.lecture.findMany({
    where: {
      isPublished: true,
    },
    include: {
      lectureLecturers: true,
    },
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 pt-24">
      <h1 className="font-bold text-6xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive pb-2 mt-16 md:mt-12">
        Event agenda
      </h1>

      <Agenda workshops={workshops} lectures={lectures} />
    </div>
  );
};

export default Page;
