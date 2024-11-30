import { prisma } from "@/lib/db";
import React from "react";
import Agenda from "@/components/landing-page/agenda";
import { Button } from "@/components/ui/button";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Link } from "next-view-transitions";

export const revalidate = 30;
export const dynamic = "force-dynamic";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();

  const workshops = await prisma.workshop.findMany({
    where: {
      isPublished: true,
    },
    include: {
      workshopLecturers: true,
    },
  });
  const lectures = await prisma.lecture.findMany({
    where: {
      isPublished: true,
    },
    include: {
      lectureLecturers: true,
    },
  });
  return (
    <section id="agenda" className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="space-y-8">
          <div className="flex flex-col max-w-screen-xl mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Check out this edition{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                agenda!
              </span>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground text-center">
            If you still don&apos;t know if you want to come - please check our
            agenda, maybe you&apos;ll find something for you!
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 py-4">
            <Agenda lectures={lectures} workshops={workshops} />
          </div>
        </div>
      </div>
      {(await isAuthenticated()) ? (
        <>
          <div className="space-y-8">
            <div className="flex flex-col items-center max-w-screen-xl pb-16 mx-auto text-center  gap-8">
              <h1 className="text-4xl md:text-6xl font-bold">
                Go to your
                <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                  {" "}
                  user panel
                </span>
              </h1>
              <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground ">
                You can check your stats, setup your profile and check your
                workshop.
              </p>

              <Button variant="secondary" size="lg" asChild className="mx-96">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-8">
            <div className="flex flex-col items-center max-w-screen-xl pb-16 mx-auto text-center  gap-8">
              <h1 className="text-4xl md:text-6xl font-bold">
                Still not
                <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                  {" "}
                  decided?
                </span>
              </h1>
              <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground ">
                We will give awesome rewards for active users. Make sure you
                don&apos;t miss this chance.
              </p>

              <Button variant="secondary" size="lg" asChild className="mx-96">
                <LoginLink>Join us today!</LoginLink>
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
