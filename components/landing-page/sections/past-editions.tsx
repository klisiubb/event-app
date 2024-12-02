"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import StatsCard from "@/components/landing-page/stats-card";
import { Button } from "@/components/ui/button";
import {
  LogoutLink,
  LoginLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Link } from "next-view-transitions";

const PastEditionSection = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <section
      id="past-editions"
      className="flex flex-col items-center justify-center pt-24 pb-12 "
    >
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        Past editions stas
      </h2>

      <h3 className="md:w-1/2 mx-auto text-lg text-muted-foreground  text-right mb-4">
        ...it&apos;s our 14th edition!
      </h3>
      <Separator className="bg-primary w-3/4" />

      <div className="grid sm:grid-cols-2 mt-16 mb-4 lg:grid-cols-4 gap-8">
        <StatsCard
          name="Editions:"
          value={14}
          description="Thanks for your support!"
        />
        <StatsCard
          name="Participants:"
          value={5300}
          description="It couldn't happen without you!"
        />
        <StatsCard
          name="Rewards:"
          value={200}
          description="Shout out to our sponsors!"
        />
        <StatsCard
          name="Workshops:"
          value={65}
          description="Hope you learned something!"
        />
      </div>
      <h2 className="text-3xl text-primary text-center  mt-8 tracking-wider font-bold uppercase">
        Still not decided?
      </h2>
      <h3 className=" mx-auto text-lg text-center text-muted-foreground my-4">
        Now it&apos;s your turn to join us. Take part in our next edition by
        clicking button below.
      </h3>
      {isAuthenticated ? (
        <Button variant="gooeyRight" size="lg" asChild className="mt-4">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      ) : (
        <Button variant="gooeyRight" size="lg" asChild className="mt-4">
          <LoginLink>Join us today!</LoginLink>
        </Button>
      )}
    </section>
  );
};

export default PastEditionSection;
