import { Reward } from "@prisma/client";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const RewardCard = ({ reward }: { reward: Reward }) => {
  return (
    <BlurFade inView duration={1}>
      <Card
        role="listitem"
        className="h-full w-full text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={reward.imageUrl!}
              alt={reward.name}
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="bg-gradient-to-br from-primary/40 to-primary/70 flex-1 flex items-center justify-center text-center p-4">
            <h3 className="text-lg md:text-xl font-semibold text-primary-foreground text-shadow-lg">
              {reward.quantity + " x " + reward.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </BlurFade>
  );
};
