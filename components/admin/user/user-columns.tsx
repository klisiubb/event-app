"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "next-view-transitions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    },
  },
  {
    accessorKey: "id",
    header: "Edit",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button variant="outline">
          <Link href={`/admin/user/edit/${user.id}`}>Edit</Link>
        </Button>
      );
    },
  },
];
