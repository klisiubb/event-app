import AboutSection from "@/components/landing-page/sections/about";
import { DiscordSection } from "@/components/landing-page//sections/discord";
import { FAQSection } from "@/components/landing-page/sections/faq";
import HeroSection from "@/components/landing-page/sections/hero";
import NewEditionSection from "@/components/landing-page/sections/new-edition";

import PercsSection from "@/components/landing-page/sections/percs";

import React from "react";
import { prisma } from "@/lib/db";
import { SponsorsSection } from "@/components/landing-page/sections/sponsors";
import PastEditionSection from "@/components/landing-page/sections/past-editions";

export const revalidate = 30;
export const dynamic = "force-dynamic";

const Page = async () => {
  const sponsors = await prisma.sponsor.findMany({
    where: {
      isPublished: true,
    },
  });
  return (
    <>
      <HeroSection />
      <NewEditionSection />
      <AboutSection />
      <PercsSection />
      <SponsorsSection sponsors={sponsors} />
      <PastEditionSection />
      <DiscordSection />
      <FAQSection />
    </>
  );
};

export default Page;
