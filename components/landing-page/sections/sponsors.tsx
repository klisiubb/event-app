"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Sponsor } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
export const SponsorsSection = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        Our sponsors
      </h2>
      <Separator className="bg-primary" />

      <h3 className=" mx-auto text-lg text-center text-muted-foreground my-8">
        This event couln&apos;t be possible without them. Thank you.
      </h3>

      <div className="mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[80-vw] my-16"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3 flex flex-col align-middle justify-between items-center"
                key={sponsor.id}
              >
                {sponsor.name}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
