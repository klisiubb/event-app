"use client";
import { CreateLecture } from "@/actions/admin/lecture/create";
import CreateDialog from "@/components/admin/create-dialog";
import { Button } from "@/components/ui/button";
import { LectureFormSchema } from "@/schemas/admin/lecture";
import { List } from "lucide-react";
import Link from "next/link";
import React from "react";

//TODO SWAP Action and Schema  later

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="pb-2 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Workshop Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the Workshop Management Panel. Here you can create new
          workshops or manage existing ones.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <CreateDialog
            buttonText="Create new workshop"
            titleText="Add new workshop"
            underTitleText="Setup workshop topic. You'll fill the rest later."
            formSchema={LectureFormSchema.pick({ topic: true })}
            fieldName="topic"
            route="workshop"
            createAction={CreateLecture}
            labelText="Workshop name:"
            descriptionText="You can change it later."
            placeholderText="e.g. 'React for beginners'"
          />
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2  hover:font-bold"
            size="lg"
          >
            <Link href="/admin/workshop/view">
              <List className="w-5 h-5" />
              Manage Workshops
            </Link>
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the buttons above to start creating or managing your workshops.
        </p>
      </div>
    </div>
  );
};

export default Page;