import { UsersView } from "@/components/admin/user/users-view";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
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
