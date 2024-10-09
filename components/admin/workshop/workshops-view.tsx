"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import WorkshopCard from "./workshop-card";
import { WorkshopWithQRCode } from "@/types/workshop-qrcode.type";
import CreateDialog from "../create-dialog";
import { WorkshopFormSchema } from "@/schemas/admin/workshop";
import { CreateWorkshop } from "@/actions/admin/workshop/create";

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
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search workshops by topic, room or description..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center md:justify-start">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredWorkshops ? (
          filteredWorkshops.map((workshop) => (
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
    </div>
  );
};
