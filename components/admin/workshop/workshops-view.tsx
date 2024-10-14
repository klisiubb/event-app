"use client";
import React, { useState } from "react";
import { useFilter } from "@/lib/use-filter";
import WorkshopCard from "./workshop-card";
import { WorkshopWithQRCode } from "@/types/workshop-qrcode.type";
import CreateDialog from "../create-dialog";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { CreateWorkshop } from "@/actions/admin/workshop/create";
import SearchInput from "../search-filter";
import StatusFilter from "../filter-status";
import { BlurFade } from "@/components/ui/blur-fade";

export const WorkshopsView = ({
  workshops,
}: {
  workshops: WorkshopWithQRCode[];
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredWorkshops = useFilter<WorkshopWithQRCode>(
    workshops,
    searchTerm,
    ["topic", "description", "room"]
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const statusFilteredWorkshops = filteredWorkshops.filter((obj) => {
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
          placeholder="Search Workshops by topic, description or room..."
        />
      </div>
      <div className="mb-4 flex justify-center items-center gap-4 md:justify-start">
        <CreateDialog
          buttonText="Create new workshop"
          titleText="Add new workshop"
          underTitleText="Setup workshop topic. You'll fill the rest later."
          formSchema={WorkshopFormSchema.pick({ topic: true })}
          fieldName="topic"
          route="workshop"
          createAction={CreateWorkshop}
          labelText="Workshop name:"
          descriptionText="You can change it later."
          placeholderText="e.g. 'React for beginners'"
        />
        <StatusFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <BlurFade inView delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {statusFilteredWorkshops.length > 0 ? (
            statusFilteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))
          ) : (
            <div className="col-span-full grid place-items-center my-4 md:my-16">
              <h1 className="font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                Workshops not found!
              </h1>
              <p className="md:text-xl mt-4">
                Change your search term or create new Workshop.
              </p>
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  );
};
