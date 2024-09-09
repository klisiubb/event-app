"use client";
import { CreateLecture } from "@/actions/admin/lecture/create";
import CreateDialog from "@/components/admin/create-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TopicFormSchema } from "@/schemas/admin/topic";
import { List } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Lecture Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the Lecture Management Panel. Here you can create new
          lectures or manage existing ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:animate-bounce hover:font-bold"
            size="lg"
          >
            <List className="w-5 h-5" />
            Manage Lectures
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the buttons above to start creating or managing your lectures.
        </p>
      </div>
    </div>
  );
};

export default Page;
