import { UsersView } from "@/components/admin/user/users-view";
import { prisma } from "@/lib/db";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
  const users = await prisma.user.findMany();

  if (!users) {
    return <></>;
  }

  return (
    <>
      <UsersView users={users} />
    </>
  );
};

export default Page;
