import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { BlurFade } from "@/components/ui/blur-fade";

export const DiscordSection = () => {
  return (
    <section id="discord" role="region" aria-labelledby="discord-section-title">
      <BlurFade inView duration={1}>
        <div className="container pb-16">
          <div className="lg:w-[60%] mx-auto">
            <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
              <CardHeader>
                <CardTitle
                  id="discord-section-title"
                  className="text-4xl md:text-5xl font-bold flex flex-col items-center"
                >
                  <DiscordLogoIcon
                    className="w-16 h-16 md:w-32 md:h-32 text-primary mb-4"
                    aria-hidden="true"
                  />
                  <div>
                    Ready to join this
                    <span className="text-transparent pl-2 bg-clip-text bg-gradient-to-tr from-primary to-destructive">
                      Event Community?
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent
                className="lg:w-[80%] text-xl text-muted-foreground"
                id="discord-description"
              >
                Join our growing Discord community! Connect, share, and talk
                with like-minded IT enthusiasts. Click to dive in! 🚀
              </CardContent>

              <CardFooter className="py-4">
                <Button
                  size="lg"
                  variant="gooeyRight"
                  asChild
                  aria-label="Join our Discord community via this link"
                >
                  <Link href="https://discord.com/" target="_blank">
                    Join Our Discord
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};
