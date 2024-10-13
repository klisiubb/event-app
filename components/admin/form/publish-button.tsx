"use client";
import { Button } from "@/components/ui/button";
import { PublishButtonProps } from "@/interfaces/admin/form";
import { useTransitionRouter } from "next-view-transitions";
import React from "react";
import { toast } from "sonner";

const PublishButton = ({
  objectId,
  isPublished,
  updateAction,
  objectName,
}: PublishButtonProps) => {
  const router = useTransitionRouter();
  return (
    <Button
      onClick={() => {
        updateAction(objectId, { isPublished: !isPublished });
        router.refresh();
        if (isPublished) {
          toast.success(
            `Unpublished ${objectName} to edit. Now only you see this.`
          );
        } else {
          toast.success(`Published ${objectName}. Now users can watch it.`);
        }
      }}
    >
      {isPublished
        ? `Unpublish this ${objectName}`
        : `Publish this ${objectName}`}
    </Button>
  );
};

export default PublishButton;
