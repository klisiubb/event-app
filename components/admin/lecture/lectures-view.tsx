"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import LectureCard from "./lecture-card";
import { Search } from "lucide-react";
import { useFilter } from "@/lib/use-filter";
import { LectureWithQRCode } from "@/types/lecture-qrcode.type";
import CreateDialog from "../create-dialog";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { CreateLecture } from "@/actions/admin/lecture/create";

export const LecturesView = ({
  lectures,
}: {
  lectures: LectureWithQRCode[];
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredLectures = useFilter<LectureWithQRCode>(lectures, searchTerm, [
    "topic",
    "description",
    "room",
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
            placeholder="Search lectures by topic, room or description..."
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center md:justify-start">
        <CreateDialog
          buttonText="Create new lecture"
          titleText="Add new lecture"
          underTitleText="Setup lecture topic. You'll fill the rest later."
          formSchema={LectureFormSchema.pick({ topic: true })}
          fieldName="topic"
          route="lecture"
          createAction={CreateLecture}
          labelText="Lecture name:"
          descriptionText="You can change it later."
          placeholderText="e.g. 'React for beginners'"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredLectures ? (
          filteredLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))
        ) : (
          <div className="col-span-full grid place-items-center my-4 md:my-16">
            <h1 className="font-bold text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              Lectures not found!
            </h1>
            <p className="md:text-xl mt-4">
              Change your search term or create new Lecture.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
