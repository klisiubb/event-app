import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SidebarMain } from "@/components/navbar/sidebar-main";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
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
