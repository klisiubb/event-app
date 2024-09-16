import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
import { GoBackButtonProps } from "@/interfaces/admin/go-back-button.interface";

const GoBackButton = ({ href }: GoBackButtonProps) => {
  return (
    <Button asChild variant="outline">
      <Link href={href} className="flex items-center justify-center">
        <Undo2Icon className="w-4 h-4 mr-2" />
        Go back
      </Link>
    </Button>
  );
};

export default GoBackButton;
