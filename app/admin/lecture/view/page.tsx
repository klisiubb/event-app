import LectureCard from "@/components/admin/lecture-card";
import { prisma } from "@/lib/db";
import React from "react";

const Page = async () => {
  const lectures = await prisma.lecture.findMany();

  return (
    <div className=" min-h-[calc(100vh-160px)] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
};

export default Page;
