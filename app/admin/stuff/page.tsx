"use client";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="pb-2 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
          Stuff Management Panel
        </h1>

        <p className="text-xl text-center text-muted-foreground">
          Welcome to the Stuff Management Panel. Here you can manage them.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2  hover:font-bold"
            size="lg"
          >
            <Link href="/admin/stuff/view">
              <List className="w-5 h-5" />
              Manage Stuff
            </Link>
          </Button>
        </div>

        <p className="text-sm text-center text-muted-foreground">
          Use the button above to start managing your stuff.
        </p>
      </div>
    </div>
  );
};

export default Page;