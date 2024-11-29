import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import GoBackButton from "@/components/admin/go-back-button";
import DeleteDialog from "@/components/admin/delete-dialog";
import { DeleteUser } from "@/actions/admin/user/delete";
import { UserEditView } from "@/components/admin/user/edit-view";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async ({ params }: { params: { userId: string } }) => {
  const { getUser, getRoles } = getKindeServerSession();
  const userKinde = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !userKinde) {
    return redirect("/");
  }
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      workshopToAttend: true,
      lectureToLecture: true,
      workshopToLecture: true,
    },
  });
  const workshops = await prisma.workshop.findMany({
    where: {
      isPublished: true,
    },
    include: { attenders: true },
  });
  const lectures = await prisma.lecture.findMany({
    where: {
      isPublished: true,
    },
  });
  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.attenders.length <
      (workshop.maxAttenders ? workshop.maxAttenders : 1)
  ); //Only published workshops with free space

  if (!user) {
    notFound();
  }
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          User setup
        </h1>
      </div>
      <div className="flex gap-4 mt-4 items-center justify-center">
        <GoBackButton href="/admin/user/view" />
        <DeleteDialog
          route="user"
          id={user.id}
          text="this User"
          deleteAction={DeleteUser}
          buttonText="Delete"
        />
      </div>
      <UserEditView
        user={user}
        workshops={filteredWorkshops}
        lectures={lectures}
      />
    </div>
  );
};

export default Page;
