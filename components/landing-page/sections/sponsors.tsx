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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export const SponsorsSection = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-12">
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        Our sponsors
      </h2>

      <h3 className=" mx-auto text-lg text-center text-muted-foreground mt-4">
        This event couldn&apos;t be possible without them. Thank you.
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
                <div className="w-[350px] h-[250px] flex justify-center">
                  <Image
                    src={sponsor.imageUrl || ""}
                    alt={sponsor.name}
                    width={600}
                    height={600}
                    className="sm:max-w-[350px] lg:max-w-[325px] max-h-[250px] max-w-[250px] object-scale-down self-center align-middle"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <h3 className=" mx-auto text-lg text-center text-muted-foreground my-4">
        You can read more about our sponsors on dedicated sponsor page.
      </h3>
      <div className="flex justify-center pt-4">
        <Button variant="secondary" size="lg" asChild className="mx-96">
          <Link href="#sponsors">Take me there</Link>
        </Button>
      </div>
    </section>
  );
};
