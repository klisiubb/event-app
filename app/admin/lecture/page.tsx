"use client";
import { CreateLecture } from "@/actions/admin/lecture/create";
import CreateDialog from "@/components/admin/create-dialog";
import { Separator } from "@/components/ui/separator";
import { TopicFormSchema } from "@/schemas/admin/topic";
import React from "react";

const Page = () => {
  return (
    <div className="p-6 md:p-10 flex flex-col items-center">
      <h1 className="text-xl md:text-3xl font-bold">Lectures Panel:</h1>
      <p className="mt-2 text-center">
        Here you can add new lectures, edit or delete already existing ones.
      </p>
      <Separator className="max-w-80 my-2" />
      <CreateDialog
        buttonText="Create new lecture"
        titleText="Add new lecture"
        underTitleText="Setup lecture topic. You'll fill the rest later."
        formSchema={TopicFormSchema}
        fieldName="topic"
        route="lecture"
        createAction={CreateLecture}
        labelText="Lecture name:"
        descriptionText="You can change it later."
        placeholderText="e.g. 'React for beginners'"
      />
    </div>
  );
};

export default Page;
