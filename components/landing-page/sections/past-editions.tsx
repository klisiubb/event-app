"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import StatsCard from "@/components/landing-page/stats-card";
import { Button } from "@/components/ui/button";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Link } from "next-view-transitions";

const PastEditionSection = () => {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <section
      id="past-editions"
      role="region"
      aria-labelledby="past-editions-heading"
      className="flex flex-col items-center justify-center"
    >
      <h2
        id="past-editions-heading"
        className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase"
      >
        Past editions stats
      </h2>

      <h3
        id="past-editions-subheading"
        className="md:w-1/2 mx-auto text-lg text-muted-foreground text-right mb-4"
        aria-describedby="past-editions-subheading-desc"
      >
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
      <div
        className="flex flex-col items-center max-w-screen-xl pb-16 mx-auto text-center gap-8"
        aria-live="polite"
      >
        {!isAuthenticated ? (
          <>
            <h1
              className="text-4xl md:text-6xl font-bold mt-8"
              id="unauth-heading"
            >
              Still not
              <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                {" "}
                decided?
              </span>
            </h1>
            <p
              className="max-w-screen-sm mx-auto text-xl text-muted-foreground"
              id="unauth-desc"
            >
              We got you! Register today and enjoy our lectures & workshops!
              Collect points for scanning QR codes. Register for this event by
              clicking the button below.
            </p>
            <Button
              variant="gooeyRight"
              size="lg"
              asChild
              aria-label="Register for the event"
            >
              <LoginLink>Join us today!</LoginLink>
            </Button>
          </>
        ) : (
          <>
            <h1
              className="text-4xl md:text-6xl font-bold mt-8"
              id="auth-heading"
            >
              Still
              <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                {" "}
                checking?
              </span>
            </h1>
            <p
              className="max-w-screen-sm mx-auto text-xl text-muted-foreground"
              id="auth-desc"
            >
              Let&apos;s go to the dashboard and check your points, scanned QR
              codes, your workshop data, and much more...
            </p>
            <Button
              variant="gooeyRight"
              size="lg"
              asChild
              aria-label="Go to your dashboard"
            >
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default PastEditionSection;
