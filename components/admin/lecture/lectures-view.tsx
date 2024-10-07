"use client";
import { Input } from "@/components/ui/input";
import { Lecture } from "@prisma/client";
import React, { useState } from "react";
import LectureCard from "../lecture-card";
import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";

export const LecturesView = ({ lectures }: { lectures: Lecture[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredLectures = useFilter<Lecture>(lectures, searchTerm, [
    "topic",
    "description",
  ]);
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lectures by topic or description..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLectures.map((lecture) => (
          <LectureCard key={lecture.id} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};
