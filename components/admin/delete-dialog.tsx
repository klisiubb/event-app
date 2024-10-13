"use client";
import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { DeleteFormProps } from "@/interfaces/admin/deleteFormProps";
import { toast } from "sonner";
import { useTransitionRouter } from "next-view-transitions";
import { Trash2 } from "lucide-react";

const DeleteDialog: FC<DeleteFormProps> = ({
  buttonText,
  text,
  id,
  deleteAction,
  route,
}) => {
  const router = useTransitionRouter();
  const onClick = async () => {
    const data = await deleteAction(id);
    if (data.status === 400) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      router.push(`/admin/${route}/view`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2 hover:font-bold"
        >
          {" "}
          <Trash2 className="h-4 w-4" />
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {text}{" "}
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onClick()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
