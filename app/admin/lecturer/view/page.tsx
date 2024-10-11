import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";
import { DeleteUser } from "@/actions/admin/user/delete";
import { UserEditView } from "@/components/admin/user/edit-view";
import { Role } from "@prisma/client";

const Page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: userId, role: Role.LECTURER },
  });
  if (!user) {
    notFound();
  }
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Lecturer setup
        </h1>
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/lecturer/view" />
        <DeleteDialog
          route="user"
          id={user.id}
          text="this User"
          deleteAction={DeleteUser}
          buttonText="Delete"
        />
      </div>
      <UserEditView user={user} />
    </div>
  );
};

export default Page;
