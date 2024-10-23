import Countdown from "@/components/lading-page/countdown";
import StatsCard from "@/components/lading-page/stats-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Ticket } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

const Page = async () => {
  const { isAuthenticated } = await getKindeServerSession();
  const text = `Welcome to the Event App, your one-stop solution for managing and attending events.`;
  const eventDate = new Date("2025-05-30T06:00:00Z");

  return (
    <>
      <section
        className="h-screen flex flex-col justify-center items-center gap-4"
        id="landing"
      >
        <h1 className="font-bold text-6xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive md:pb-4">
          Event App
        </h1>
        <TypingAnimation
          className="leading-normal text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-center px-4"
          text={text}
          duration={25}
        />
        <BlurFade inView duration={1}>
          <div className="space-x-4 mt-4">
            {(await isAuthenticated()) ? (
              <Button asChild size="lg">
                <LogoutLink>Log out</LogoutLink>
              </Button>
            ) : (
              <Button asChild size="lg">
                <LoginLink>Join the wait list</LoginLink>
              </Button>
            )}
            <Button variant="outline" asChild size="lg">
              <Link href="/agenda">Explore agenda</Link>
            </Button>
          </div>
        </BlurFade>
      </section>
      <section
        className="flex flex-col justify-center items-center h-screen gap-4"
        id="timer"
      >
        <h1 className="font-bold text-center text-6xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive pb-10 md:pb-4">
          Next edition is coming in:
        </h1>
        <BlurFade inView duration={1}>
          <Countdown targetDate={eventDate} />
        </BlurFade>
      </section>
      <section className=" h-screen" id="stats">
        <h1 className="font-bold text-center text-6xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive pb-10 md:pb-8">
          Past event editions in numbers:
        </h1>
        <BlurFade inView duration={1}>
          <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
            <StatsCard name="Editions" stat={13} />
            <StatsCard name="Attenders" stat={6000} />
            <StatsCard name="Rewards given" stat={250} />
            <StatsCard name="Workshops" stat={70} />
          </div>
        </BlurFade>
      </section>
    </>
  );
};

export default Page;
