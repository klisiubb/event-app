import React from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Building2, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

const AboutSection = () => {
  const eventDate = new Date(
    process.env.NEXT_PUBLIC_EVENT_DATE || "2025-05-30T06:00:00Z"
  );
  return (
    <section id="contact" className="container py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
              About this edition
            </h2>
          </div>
          <p className="mb-8 lg:w-5/6 md:text-lg">
            This is 14 edition of our event. You can expect many surprises, good
            quality lectures and awesome workshops.
          </p>
          <div className="flex md:flex-col gap-4 md:text-lg flex-row">
            <div>
              <div className="flex gap-2 text-primary">
                <Building2 />
                <div className="font-bold md:text-xl mb-2">Where?</div>
              </div>

              <div>742 Street Street, City, SL 23704</div>
            </div>

            <div>
              <div className="flex gap-2 text-primary">
                <Clock />
                <div className="font-bold  md:text-xl mb-2">When?</div>
              </div>

              <div>
                <div>{eventDate.toDateString()}</div>
              </div>
            </div>

            <div>
              <div className="flex gap-2 text-primary ">
                <Mail />
                <div className="font-bold  md:text-xl mb-2">Any questions?</div>
              </div>

              <div>event@gexample.com</div>
            </div>
          </div>
          <h2 className="text-3xl text-primary text-center mt-16 tracking-wider font-bold uppercase">
            Meet our volunteers
          </h2>
          <p className="mt-4 lg:w-5/6 md:text-lg">
            We couldn&apos;t make it happen without them. We appreciate theirs
            awesome help. We would like you to take a minute to meet them!
          </p>
          <div className="flex mt-8 justify-center">
            <Button variant="gooeyRight" asChild size="lg">
              <Link href="/staff">Take me there</Link>
            </Button>
          </div>
        </div>

        <BlurFade inView duration={2} className="hidden lg:block">
          <div className="w-full bg-primary shadow-lg shadow-primary/30 rounded-lg">
            <Image
              width={1900}
              height={1300}
              className="w-full mx-auto py-8 lg:-translate-x-16 md:pt-16 md:pb-16 scale-75  md:scale-90 lg:scale-100"
              alt="Event room"
              src="/room.jpg"
              priority
            />
          </div>
        </BlurFade>
      </section>
    </section>
  );
};

export default AboutSection;
