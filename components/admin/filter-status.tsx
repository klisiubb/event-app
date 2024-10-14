import React from "react";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface StatusFilterProps {
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <Select value={filterStatus} onValueChange={setFilterStatus}>
      <SelectTrigger className="w-[250px] h-10">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Show all</SelectItem>
          <SelectItem value="published">Show only published</SelectItem>
          <SelectItem value="unpublished">Show only unpublished</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
