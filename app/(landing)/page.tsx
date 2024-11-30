"use client";

import AboutSection from "@/components/landing-page/sections/about";
import { DiscordSection } from "@/components/landing-page//sections/discord";
import { FAQSection } from "@/components/landing-page/sections/faq";
import HeroSection from "@/components/landing-page/sections/hero";
import NewEditionSection from "@/components/landing-page/sections/new-edition";

import PercsSection from "@/components/landing-page/sections/percs";

import React from "react";

const Page = () => {
  return (
    <>
      <HeroSection />
      <NewEditionSection />
      <AboutSection />
      <PercsSection />
      <DiscordSection />
      <FAQSection />
    </>
  );
};

export default Page;
