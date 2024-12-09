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
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Link } from "next-view-transitions";

export const SponsorsSection = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <section
      id="sponsors"
      className="max-w-[75%] mx-auto pt-4"
      role="region"
      aria-labelledby="sponsors-heading"
    >
      <h2
        id="sponsors-heading"
        className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase"
      >
        Our sponsors
      </h2>
      <Separator className="bg-primary" />
      <h3
        className="mx-auto text-lg text-center text-muted-foreground mt-8"
        aria-describedby="sponsors-description"
      >
        This event couldn&apos;t be possible without them. Thank you for your
        financial help.
      </h3>

      <div className="mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[80-vw] my-4"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          aria-label="Sponsors carousel"
          role="region"
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3 flex flex-col align-middle justify-between items-center"
                key={sponsor.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Sponsor ${sponsor.name}`}
              >
                <div className="w-[350px] h-[250px] flex flex-col items-center justify-center">
                  <Link
                    href={`/sponsors#${sponsor.name}`}
                    aria-label={`Link to sponor ${sponsor.name} section.`}
                  >
                    <Image
                      src={sponsor.imageUrl || ""}
                      alt={sponsor.name}
                      width={600}
                      height={600}
                      className="sm:max-w-[350px] lg:max-w-[325px] max-h-[250px] max-w-[250px] object-scale-down self-center align-middle"
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous sponsors" role="button" />
          <CarouselNext aria-label="Next sponsors" role="button" />
        </Carousel>
      </div>
    </section>
  );
};
