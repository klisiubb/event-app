import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserStats from "@/components/admin/stats/users-stats";
import WorkshopStats from "@/components/admin/stats/workshop-stats";
import LecturesStats from "@/components/admin/stats/lectures-stats";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <h1 className="pb-2 text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
        View stats of your Event:
      </h1>
      <Tabs defaultValue="users" className="space-y-4 py-4">
        <TabsList className="flex py-6 bg-secondary ">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="workshops">Workshop</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <UserStats />
        </TabsContent>
        <TabsContent value="workshops" className="space-y-4">
          <WorkshopStats />
        </TabsContent>
        <TabsContent value="lectures" className="space-y-4">
          <LecturesStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
