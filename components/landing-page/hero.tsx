import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BlurFade } from "../ui/blur-fade";
import { TypingAnimation } from "../ui/typing-animation";
export default function HeroSection() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2 gap-x-2">
            <span className="relative flex h-4 w-4 ">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-primary"></span>
            </span>

            <span> New Edition date is revealed! </span>
          </Badge>

          <div className="flex flex-col max-w-screen-xl mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>Experience the new version of</h1>
            <TypingAnimation
              duration={25}
              className="text-4xl md:text-6xl font-bold px-2 bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive"
              text="Event App"
            />
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            Join us now. Our Event will surprise you with awesome lectures and
            well-suited workshops. Scan QR codes to win rewards in our game!
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button variant="gooeyRight" asChild size="lg">
              <Link href="/agenda">Explore agenda</Link>
            </Button>
            {isAuthenticated ? (
              <Button variant="outline" size="lg" asChild>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" asChild>
                <LoginLink>Login</LoginLink>
              </Button>
            )}
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <BlurFade inView duration={5}>
            <Image
              width={1200}
              height={800}
              className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
              alt="Event"
              src="/conf.jpg"
              priority
            />
          </BlurFade>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}
