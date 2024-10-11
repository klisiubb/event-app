"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import CreateDialog from "../create-dialog";
import { Reward } from "@prisma/client";
import { CreateReward } from "@/actions/admin/reward/create";
import { RewardFormSchema } from "@/schemas/admin/reward";
import RewardCard from "./reward-card";

export const RewardsView = ({ rewards }: { rewards: Reward[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredRewards = useFilter<Reward>(rewards, searchTerm, [
    "name",
    "description",
  ]);
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rewards by name or description..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center md:justify-start">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredRewards ? (
          filteredRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))
        ) : (
          <div className="col-span-full grid place-items-center my-4 md:my-16">
            <h1 className="font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              Rewards not found!
            </h1>
            <p className="md:text-xl mt-4">
              Change your search term or create new Reward.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
