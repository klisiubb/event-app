import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate = 30;
export const dynamic = "force-dynamic";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return redirect("/api/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: kindeUser.id,
    },
  });

  return (
    <div className="container md:py-24 py-32">
      <div className="space-y-8">
        <div className="flex flex-col max-w-screen-xl mx-auto text-center text-4xl md:text-6xl font-bold">
          <h1>
            Hello,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              {user?.firstName}
            </span>
            👋
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
