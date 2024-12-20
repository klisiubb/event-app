import React from "react";

import { SidebarMain } from "@/components/navbar/sidebar-main";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const isAdmin = roles?.some((role) => role.key === "admin") || false;
  if (!isAdmin || !user) {
    return redirect("/");
  }
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
        Hello, {user.given_name}!
      </h1>

      <TypingAnimation
        text=" Here you can manage all of the things. Choose must suitable option from
        menu below."
        className="text-sm lg:text-lg text-center md:mt-4 font-normal"
        duration={25}
      />
      <BlurFade inView delay={0.1}>
        <SidebarMain />
      </BlurFade>
    </div>
  );
};

export default Page;
