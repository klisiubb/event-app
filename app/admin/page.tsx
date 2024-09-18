import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SidebarMain } from "@/components/navbar/sidebar-main";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex flex-col min-h-[calc(100vh-160px)]  justify-center items-center p-6 md:p-10">
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive mb-8">
        Hello, {user?.given_name}!
      </h1>
      <p className=" text-sm lg:text-xl text-center md:mt-4">
        Here you can manage all of the things. Choose must suitable option from
        menu below.
      </p>
      <SidebarMain />
    </div>
  );
};

export default Page;
