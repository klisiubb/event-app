"use client";

import { User } from "@prisma/client";
import { DataTable } from "./user-data-table";
import { columns } from "./user-columns";

export const UsersView = ({ users }: { users: User[] }) => {
  return (
    <div className="min-h-[calc(100vh-160px)] p-6 md:p-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
