import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewItem } from "@/components/admin/stats/overview-item";
import { UsersIcon } from "lucide-react";
const Page = async () => {
  const users = await prisma.user.findMany({ where: { role: Role.USER } });
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <Tabs defaultValue="users" className="space-y-4 py-4">
        <TabsList className="flex py-6 bg-secondary ">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="workshops">Workshop</TabsTrigger>
          <TabsTrigger value="lectures">Lectures</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewItem
              title="Registered users"
              subTitle="Users that are not part of stuff or lecturers"
              icon={UsersIcon}
              number={users.length}
            />
            <OverviewItem
              title="Registered users"
              subTitle="Users that are not part of stuff or lecturers"
              icon={UsersIcon}
              number={users.length}
            />
            <OverviewItem
              title="Registered users"
              subTitle="Users that are not part of stuff or lecturers"
              icon={UsersIcon}
              number={users.length}
            />
            <OverviewItem
              title="Registered users"
              subTitle="Users that are not part of stuff or lecturers"
              icon={UsersIcon}
              number={users.length}
            />
          </div>
        </TabsContent>
        <TabsContent value="workshops" className="space-y-4">
          TODO
        </TabsContent>
        <TabsContent value="lecturers" className="space-y-4">
          TODO
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
