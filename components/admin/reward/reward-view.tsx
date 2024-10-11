import { ImageIcon, TrophyIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Reward } from "@prisma/client";

export default function RewardView({ reward }: { reward: Reward }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {reward.imageUrl ? (
            <Image
              src={reward.imageUrl}
              alt={reward.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="sr-only">Image not yet set</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-primary">
            {reward.name}
          </h2>
          <p className="text-center text-muted-foreground">
            {reward.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm border-t pt-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <TrophyIcon className="w-4 h-4" />
            <span>
              {reward.quantity ? reward.quantity : "Quantity not yet set"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
