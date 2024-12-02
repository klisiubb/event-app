import React from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { User } from "@prisma/client";

export const StaffCard = ({ member }: { member: User }) => {
  return (
    <BlurFade inView duration={1}>
      <Card className="relative overflow-hidden group transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-primary/20 border-2 border-primary/20 hover:border-primary/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="aspect-[4/3] sm:aspect-[3/4] relative overflow-hidden">
            {member.imageUrl ? (
              <Image
                src={member.imageUrl}
                alt={`${member.firstName} ${member.lastName}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <UserIcon className="h-1/4 w-1/4 text-muted-foreground" />
              </div>
            )}
          </div>

          <CardContent className="p-3 sm:p-4 text-center">
            <h3 className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1 text-foreground/80 group-hover:text-primary transition-colors duration-300">
              {member.firstName} {member.lastName}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {member.position}
            </p>
          </CardContent>
        </div>

        <div className="mt-2 h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40 group-hover:from-primary/40 group-hover:to-primary/60 transition-colors duration-300" />
      </Card>
    </BlurFade>
  );
};
