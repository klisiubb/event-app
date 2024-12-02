import StatsCard from "@/components/landing-page/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MapPin } from "lucide-react";
import { Link } from "next-view-transitions";
import { notFound, redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Separator } from "@/components/ui/separator";

export const revalidate = 30;
export const dynamic = "force-dynamic";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return redirect("/api/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: kindeUser.id,
    },
    include: {
      _count: {
        select: { QrCode: true, Reward: true },
      },
      workshopToAttend: true,
    },
  });
  if (!user) {
    return notFound();
  }

  const scannedQR = user._count.QrCode;
  const rewardsWon = user._count.Reward;

  return (
    <div className="container md:py-24 py-32">
      <div className="space-y-8">
        <div className="flex flex-col max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Hello,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              {user.firstName}
            </span>
            👋
          </h1>
          <p className="text-muted-foreground mt-4">
            User since: {user.createdAt.toLocaleDateString()}
          </p>
          <h2 className="text-3xl text-primary text-center mt-4 tracking-wider font-bold uppercase">
            Your stats & workshops
          </h2>
          <div className="grid sm:grid-cols-1 mt-12 mb-4 lg:grid-cols-3 gap-8">
            <StatsCard
              name="Points earned:"
              value={user.points}
              description="Collected by scanning QR codes!"
            />
            <StatsCard
              name="Scanned QR's:"
              value={scannedQR}
              description="Number of QR's found by you!"
            />
            <StatsCard
              name="Rewards:"
              value={rewardsWon}
              description="Rewards collected by you. Congrats!"
            />
          </div>
          {user.workshopToAttendId !== null ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <BlurFade inView duration={1}>
                  <Card className="relative w-full max-w-2xl overflow-hidden border-4 border-primary/20 group hover:border-primary/40 mt-4 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="relative h-64 w-full">
                        <Image
                          src={user.workshopToAttend!.imageUrl!}
                          alt={user.workshopToAttend!.topic}
                          layout="fill"
                          objectFit="cover"
                          className="border-b-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl text-foreground/80 group-hover:text-primary transition-colors duration-300 tracking-wide">
                          {user.workshopToAttend?.topic}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          {user.workshopToAttend!.description}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>Room: {user.workshopToAttend!.room}</span>
                        </div>
                      </CardContent>
                    </div>
                    <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40 group-hover:from-primary/40 group-hover:to-primary/60 transition-colors duration-300" />
                  </Card>
                </BlurFade>

                <h3 className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground my-8">
                  You&apos;ve signed up for the workshop! Thank you. If
                  you&apos;d like to switch to a different one, please contact
                  us via email.
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground my-8">
                Hey, you still haven&apos;t signed up for the workshop. If
                you&apos;d like to, please check the available workshops by
                clicking the button below.
              </h3>
              <Button variant="gooeyRight" asChild size="lg" className="w-64">
                <Link href="/workshops">Take me there</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
