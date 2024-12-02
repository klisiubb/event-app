"use client";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function HeroSection() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <section
      className="container w-full my-24"
      role="region"
      aria-labelledby="hero-section-title"
    >
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto">
        <div className="text-center space-y-6">
          <Badge
            variant="outline"
            className="text-sm py-2 gap-x-2"
            aria-label="New Edition date is revealed!"
          >
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-primary"></span>
            </span>
            <span>New Edition date is revealed!</span>
          </Badge>

          <div className="flex flex-col max-w-screen-xl mx-auto">
            <h1
              id="hero-section-title"
              className="text-center text-4xl md:text-6xl font-bold"
            >
              Experience the new version of
            </h1>
            <TypingAnimation
              duration={50}
              className="text-4xl md:text-6xl font-bold px-2 bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive"
              text="Event App"
            />
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            Join us now. Our Event will surprise you with awesome lectures and
            well-suited workshops. Scan QR codes to win rewards in our game!
          </p>

          <div className="space-y-4 md:space-y-0 space-x-4">
            <Button variant="gooeyRight" asChild size="lg">
              <Link href="/agenda">Explore agenda</Link>
            </Button>
            {isAuthenticated ? (
              <Button variant="secondary" size="lg" asChild>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" asChild>
                <LoginLink>Login</LoginLink>
              </Button>
            )}
          </div>
        </div>

        <div className="relative group mt-6">
          <div
            className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"
            aria-hidden="true"
          ></div>
          <BlurFade inView duration={5}>
            <Image
              width={1200}
              height={800}
              className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
              alt="An overview of the Event showing a vibrant conference setup"
              src="/conf.jpg"
              priority
            />
          </BlurFade>

          <div
            className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  );
}
