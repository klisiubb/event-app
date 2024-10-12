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
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sponsors by topic or description..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center md:justify-start">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredSponsors ? (
          filteredSponsors.map((sponsor) => (
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
    </div>
  );
};
