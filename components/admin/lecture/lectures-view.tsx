"use client";
import React, { useState } from "react";
import LectureCard from "./lecture-card";
import { useFilter } from "@/lib/use-filter";
import { LectureWithQRCode } from "@/types/lecture-qrcode.type";
import CreateDialog from "../create-dialog";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { CreateLecture } from "@/actions/admin/lecture/create";
import { BlurFade } from "@/components/ui/blur-fade";
import SearchInput from "../search-filter";
import StatusFilter from "../filter-status";

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
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const statusFilteredLectures = filteredLectures.filter((obj) => {
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
          placeholder="Search lectures by topic, room or description.."
        />
      </div>
      <div className="mb-4 flex justify-center items-center gap-4 md:justify-start">
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
        <StatusFilter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
      <BlurFade inView delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
          {statusFilteredLectures.length > 0 ? (
            statusFilteredLectures.map((lecture) => (
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
      </BlurFade>
    </div>
  );
};
