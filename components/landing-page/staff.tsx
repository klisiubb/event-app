import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import { User } from "@prisma/client";
import { User as UserIcon } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";

export const StaffSection = async ({ team }: { team: User[] }) => {
  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center">
        <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
          Meet our staff
        </h2>

        <h3 className="md:w-1/2 mx-auto text-lg text-center text-muted-foreground mb-8">
          We couldn&apos;t make it happen without them. We appreciate your
          awesome help.
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {team.map(({ imageUrl, firstName, lastName, position }, index) => (
          <BlurFade inView duration={1} key={index}>
            <Card className="flex flex-col h-full overflow-hidden group/hoverimg shadow-lg shadow-primary/30">
              <CardHeader className="p-0 gap-0 ">
                <div className="h-full overflow-hidden  border-primary border-b">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${firstName} ${lastName}`}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center bg-muted">
                      <UserIcon className="h-24 w-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="py-6 pb-4 px-6 font-extrabold tracking-wider text-lg text-primary ">
                  {firstName + " " + lastName}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8 text-muted-foreground">
                {position}
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      <div className="py-12">
        <div className="flex flex-col max-w-screen-xl mx-auto text-center items-center   gap-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            What about{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              sponsors?
            </span>
          </h1>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground ">
            Sponsors are important part of our event. We could&apos;t give you
            amazing rewards without them!
          </p>

          <Button variant="secondary" size="lg" asChild className="mx-96">
            <Link href="/sponsors">Check out sponsors!</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
