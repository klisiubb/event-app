import React from "react";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RoleFilterProps {
  filterRole: string;
  setFilterRole: (value: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({
  filterRole,
  setFilterRole,
}) => {
  return (
    <Select value={filterRole} onValueChange={setFilterRole}>
      <SelectTrigger className="w-[250px] h-10">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Show all</SelectItem>
          <SelectItem value="USER">User</SelectItem>
          <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="LECTURER">Lecturer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RoleFilter;
