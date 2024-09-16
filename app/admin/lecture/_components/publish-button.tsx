"use client";
import { UpdateLecture } from "@/actions/admin/lecture/update";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface PublishButtonProps {
  lectureId: string;
  isPublished: boolean;
}

const PublishButton = ({ lectureId, isPublished }: PublishButtonProps) => {
  const router = useRouter();
  return (
    <Button
      className="my-4"
      onClick={() => {
        UpdateLecture(lectureId, { isPublished: !isPublished });
        router.refresh();
        if (isPublished) {
          toast.success(
            "Unpublished lecture to edit. Now only you see this lecture."
          );
        } else {
          toast.success("Published lecture. Now users can watch it.");
        }
      }}
    >
      {isPublished ? "Unpublish this lecture" : "Publish this lecture"}
    </Button>
  );
};

export default PublishButton;
