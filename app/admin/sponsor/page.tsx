"use client";
import { CreateSponsor } from "@/actions/admin/sponsor/create";
import CreateDialog from "@/components/admin/create-dialog";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SponsorFormSchema } from "@/schemas/admin/sponsor";
import { List } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="pb-2 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Sponsor Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the Sponsor Management Panel. Here you can create new
          workshops or manage existing ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CreateDialog
            buttonText="Add new Sponsor"
            titleText="Add new Sponsor"
            underTitleText="Setup Sponsor name. You'll fill the rest later."
            formSchema={SponsorFormSchema.pick({ name: true })}
            fieldName="name"
            route="sponsor"
            createAction={CreateSponsor}
            labelText="Sponsor name:"
            descriptionText="You can change it later."
            placeholderText="e.g. 'Sponsor 1'"
          />
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2  hover:font-bold z-10"
            size="lg"
          >
            <Link href="/admin/sponsor/view">
              <List className="w-5 h-5" />
              Manage Sponsors
            </Link>
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the buttons above to start creating or managing your Sponsors.
        </p>
      </div>
    </div>
  );
};

export default Page;
