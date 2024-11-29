"use client";
import Countdown from "@/components/lading-page/countdown";
import StatsCard from "@/components/lading-page/stats-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Link } from "next-view-transitions";
import React from "react";

const Page = () => {
  const text = `Welcome to the Event App, your one-stop solution for managing and attending events.`;
  const eventDate = new Date("2025-05-30T06:00:00Z");
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="flex flex-col">
      <section
        className="h-screen flex flex-col justify-center items-center px-4"
        id="landing"
      >
        <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive text-center mb-6">
          Event App
        </h1>
        <TypingAnimation
          className="leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground text-center max-w-3xl mb-8"
          text={text}
          duration={25}
        />
        <BlurFade inView duration={1}>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" asChild size="lg">
              <Link href="/agenda">Explore agenda</Link>
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" size="lg" asChild>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" asChild>
                <LoginLink>Login</LoginLink>
              </Button>
            )}
          </div>
        </BlurFade>
      </section>

      <section
        className="h-screen flex flex-col justify-center items-center px-4"
        id="timer"
      >
        <h2 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive mb-10">
          Next edition is coming in:
        </h2>
        <BlurFade inView duration={1}>
          <Countdown targetDate={eventDate} />
        </BlurFade>
      </section>

      <section
        className="h-screen flex flex-col justify-center items-center px-4"
        id="stats"
      >
        <h2 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive mb-12">
          Past event editions in numbers:
        </h2>
        <BlurFade inView duration={1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StatsCard name="Editions" stat={13} />
            <StatsCard name="Attenders" stat={6000} />
            <StatsCard name="Rewards given" stat={250} />
            <StatsCard name="Workshops" stat={70} />
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Page;
