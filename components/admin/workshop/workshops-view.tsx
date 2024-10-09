"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import WorkshopCard from "./workshop-card";
import { WorkshopWithQRCode } from "@/types/workshop-qrcode.type";

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
      <div className="flex justify-center mb-16">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
};
