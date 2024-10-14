"use client";
import React, { useState } from "react";
import { useFilter } from "@/lib/use-filter";
import CreateDialog from "../create-dialog";
import { Reward } from "@prisma/client";
import { CreateReward } from "@/actions/admin/reward/create";
import { RewardFormSchema } from "@/schemas/admin/reward";
import RewardCard from "./reward-card";
import { BlurFade } from "@/components/ui/blur-fade";
import SearchInput from "../search-filter";
import StatusFilter from "../filter-status";

export const RewardsView = ({ rewards }: { rewards: Reward[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredRewards = useFilter<Reward>(rewards, searchTerm, [
    "name",
    "description",
  ]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const statusFilteredRewards = filteredRewards.filter((obj) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "published") return obj.isPublished;
    if (filterStatus === "unpublished") return !obj.isPublished;
    return true;
  });
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Rewards by name, description..."
        />
      </div>
      <div className="mb-4 flex justify-center items-center gap-4 md:justify-start">
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
        <StatusFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <BlurFade inView delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {statusFilteredRewards.length > 0 ? (
            statusFilteredRewards.map((reward) => (
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
      </BlurFade>
    </div>
  );
};
