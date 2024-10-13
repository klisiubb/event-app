import { UsersIcon } from "lucide-react";
import React from "react";
import { OverviewItem } from "./overview-item";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

const WorkshopStats = async () => {
  const users = await prisma.user.findMany({ where: { role: Role.USER } });
  return (
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
  );
};

export default WorkshopStats;
