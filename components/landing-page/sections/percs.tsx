import React from "react";
import InfoCard from "@/components/landing-page/info-card";
import {
  HeartHandshakeIcon,
  JoystickIcon,
  PencilRulerIcon,
  PresentationIcon,
  QrCodeIcon,
  TrophyIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PercsSection = () => {
  return (
    <section
      id="percs"
      className="flex flex-col items-center justify-center py-24"
    >
      <h2 className="text-3xl text-primary text-center mb-4 tracking-wider font-bold uppercase">
        Awesome percs are waiting for you...*
      </h2>

      <h3 className="md:w-1/2 mx-auto text-lg text-muted-foreground  text-right mb-4">
        ...and of course many more!
      </h3>
      <Separator className="bg-primary w-3/4" />

      <div className="grid sm:grid-cols-2 mt-16 lg:grid-cols-3 gap-8">
        <InfoCard
          name="Lectures"
          icon={PresentationIcon}
          description="Attend awesome lectures presented by well-known speakers in our community."
        />
        <InfoCard
          name="Workshops"
          icon={PencilRulerIcon}
          description="Take part in our best workshops, focused on learning by doing."
        />
        <InfoCard
          name="Gaming zone"
          icon={JoystickIcon}
          description="Chil out zone where you can play some board or VR games with friends."
        />
        <InfoCard
          name="Sponsors"
          icon={HeartHandshakeIcon}
          description="Get in touch with local companies. Meet your future employers."
        />
        <InfoCard
          name="QR Code game"
          icon={QrCodeIcon}
          description="Scan QR codes, earn points and take part in our game."
        />
        <InfoCard
          name="Rewards"
          icon={TrophyIcon}
          description="At the end of event, we will draw winners from our QR code game."
        />
      </div>
    </section>
  );
};

export default PercsSection;
