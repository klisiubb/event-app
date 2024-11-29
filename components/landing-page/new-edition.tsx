import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Countdown from "@/components/landing-page/countdown";
import { Separator } from "@/components/ui/separator";

const NewEditionSection = () => {
  const eventDate = new Date(
    process.env.NEXT_PUBLIC_WEBSITE_URL || "2025-05-30T06:00:00Z"
  );
  return (
    <section id="new-edition" className="container md:py-24 ">
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        New edition is comming in...
      </h2>
      <Separator className="bg-primary" />

      <h3 className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground my-8">
        This year we shift focus to lecture you about newest AI trends,
        including awesome workshops from well-known researchers.
      </h3>

      <BlurFade inView duration={1} className="mt-16">
        <Countdown targetDate={eventDate} />
      </BlurFade>
    </section>
  );
};

export default NewEditionSection;
