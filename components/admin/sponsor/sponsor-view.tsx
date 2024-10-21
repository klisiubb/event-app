import { ClockIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Sponsor } from "@prisma/client";
import { Link } from "next-view-transitions";

export default function sponsorView({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {sponsor.imageUrl ? (
            <Image
              src={sponsor.imageUrl}
              alt={sponsor.name}
              width={1600}
              height={900}
              className="transition-transform duration-300 hover:scale-105 object-contain"
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
            {sponsor.name}
          </h2>
          <p className="text-center text-muted-foreground">
            {sponsor.description || "Description not yet set"}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm border-t pt-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <ClockIcon className="w-4 h-4" />
            <span>
              {sponsor.websiteUrl ? (
                <Link href={sponsor.websiteUrl}>Sponsor website</Link>
              ) : (
                "Website not yet set."
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
