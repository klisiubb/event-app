import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const Page = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();
  const text = `Welcome to the Event App, your one-stop solution for managing and
            attending events.`;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <section>
        <div className="flex max-w-[64rem] flex-col justify-center items-center gap-4">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
            Event App
          </h1>
          <TypingAnimation
            className="leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center"
            text={text}
            duration={50}
          />

          <div className="space-x-4">
            {(await isAuthenticated()) ? (
              <Button asChild size="lg">
                <LogoutLink>Log out </LogoutLink>
              </Button>
            ) : (
              <Button asChild size="lg">
                <LoginLink>Join us </LoginLink>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
