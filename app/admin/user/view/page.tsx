import { UsersView } from "@/components/admin/user/users-view";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
  const session = await requireAdmin();
  if (!session) {
    return redirect("/");
  }
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
