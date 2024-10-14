"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import CreateDialog from "../create-dialog";
import { SponsorWithQRCode } from "@/types/sponsor-qrcode.type";
import { SponsorFormSchema } from "@/schemas/admin/sponsor";
import { CreateSponsor } from "@/actions/admin/sponsor/create";
import SponsorCard from "./sponsor-card";
import { BlurFade } from "@/components/ui/blur-fade";
import SearchInput from "../search-filter";
import StatusFilter from "../filter-status";

export const SponsorsView = ({
  sponsors,
}: {
  sponsors: SponsorWithQRCode[];
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredSponsors = useFilter<SponsorWithQRCode>(sponsors, searchTerm, [
    "name",
    "description",
  ]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const statusFilteredSponsors = filteredSponsors.filter((obj) => {
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
          placeholder="Search Workshops by name, description..."
        />
      </div>
      <div className="mb-4 flex justify-center items-center gap-4 md:justify-start">
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
        <StatusFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <BlurFade inView delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {statusFilteredSponsors ? (
            statusFilteredSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))
          ) : (
            <div className="col-span-full grid place-items-center my-4 md:my-16">
              <h1 className="font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                Sponsors not found!
              </h1>
              <p className="md:text-xl mt-4">
                Change your search term or create new Sponsor.
              </p>
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  );
};
