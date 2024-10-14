"use client";
import { CreateReward } from "@/actions/admin/reward/create";
import CreateDialog from "@/components/admin/create-dialog";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RewardFormSchema } from "@/schemas/admin/reward";
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
          Reward Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the Reward Management Panel. Here you can create new
          rewards or manage existing ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CreateDialog
            buttonText="Create new reward"
            titleText="Add new reward"
            underTitleText="Setup reward name. You'll fill the rest later."
            formSchema={RewardFormSchema.pick({ name: true })}
            fieldName="name"
            route="reward"
            createAction={CreateReward}
            labelText="Reward name:"
            descriptionText="You can change it later."
            placeholderText="e.g. 'PS5 with GTA V'"
          />
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2  hover:font-bold z-10"
            size="lg"
          >
            <Link href="/admin/reward/view">
              <List className="w-5 h-5" />
              Manage Rewards
            </Link>
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the buttons above to start creating or managing your rewards.
        </p>
      </div>
    </div>
  );
};

export default Page;
