import { WorkshopsView } from "@/components/admin/workshop/workshops-view";
import { prisma } from "@/lib/db";
import React from "react";

const Page = async () => {
  const workshops = await prisma.workshop.findMany();

  return <WorkshopsView workshops={workshops} />;
};

export default Page;
