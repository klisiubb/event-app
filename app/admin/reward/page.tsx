"use client";
import { CreateReward } from "@/actions/admin/reward/create";
import CreateDialog from "@/components/admin/create-dialog";
import { Button } from "@/components/ui/button";
import { RewardFormSchema } from "@/schemas/admin/reward";
import { List } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center">
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
            className="flex items-center gap-2  hover:font-bold"
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
