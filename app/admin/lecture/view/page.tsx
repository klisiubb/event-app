import { LecturesView } from "@/components/admin/lecture/lectures-view";
import { prisma } from "@/lib/db";
import React from "react";

const Page = async () => {
  const lectures = await prisma.lecture.findMany();

  return <LecturesView lectures={lectures} />;
};

export default Page;
