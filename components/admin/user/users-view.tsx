"use client";

import { User } from "@prisma/client";

export const UsersView = ({ users }: { users: User[] }) => {
  return <div className="min-h-[calc(100vh-160px)] p-6 md:p-10"></div>;
};
