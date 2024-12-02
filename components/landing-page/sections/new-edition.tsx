import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Countdown from "@/components/landing-page/countdown";
import { Separator } from "@/components/ui/separator";

const NewEditionSection = () => {
  const eventDate = new Date(
    process.env.NEXT_PUBLIC_EVENT_DATE || "2025-05-30T06:00:00Z"
  );
  return (
    <section
      id="new-edition"
      className="container"
      role="region"
      aria-labelledby="new-edition-section-title"
    >
      <h2
        id="new-edition-section-title"
        className="text-3xl text-primary text-center mb-8 tracking-wider font-bold uppercase"
      >
        New edition is coming in...
      </h2>
      <Separator className="bg-primary" />

      <BlurFade inView duration={1} className="mt-8">
        <div
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-describedby="countdown-description"
        >
          <Countdown targetDate={eventDate} />
        </div>
      </BlurFade>

      <h3
        id="countdown-description"
        className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground mt-8"
      >
        This year we shift focus to lecture you about the newest AI trends,
        including awesome workshops from well-known researchers.
      </h3>
    </section>
  );
};

export default NewEditionSection;
