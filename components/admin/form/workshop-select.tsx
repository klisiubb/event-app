"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransitionRouter } from "next-view-transitions";
import { useState } from "react";
import { TextFormProps } from "@/interfaces/admin/form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { ActionReturnType } from "@/interfaces/actionReturnType";
import { ZodSchema } from "zod";
import { Workshop } from "@prisma/client";

export interface WorkshopSelectFormProps {
  data: Workshop[];
  editText: string;
  placeholderText: string;
  textFieldName: string;
  fieldName: string;
  workshopToAttendId: string | null;
  objectId: string;
  validationSchema: ZodSchema;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
}

export const WorkshopSelectForm = ({
  editText,
  textFieldName,
  workshopToAttendId,
  objectId,
  fieldName,
  validationSchema,
  updateAction,
  placeholderText,
  data,
}: WorkshopSelectFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<Partial<z.infer<typeof validationSchema>>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      workshopToAttendId: workshopToAttendId || null,
    },
  });

  const { isSubmitting } = form.formState;

  const router = useTransitionRouter();

  const onSubmit: SubmitHandler<
    Partial<z.infer<typeof validationSchema>>
  > = async (textValue) => {
    const data = await updateAction(objectId, textValue);

    if (data.status === 400) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
      setIsEditing(false);
      router.refresh();
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="text-primary">{textFieldName}</div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <span className="hover:font-bold">Cancel</span>
          ) : (
            <span className="flex hover:font-bold">
              <Pencil className="h-4 w-4 mr-2" />
              {editText}
            </span>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {workshopToAttendId ? (
            data
              .filter((workshop) => workshop.id === workshopToAttendId)
              .map((workshop) => workshop.topic)
          ) : (
            <span className="font-bold text-red-500">Workshop not yet set</span>
          )}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={placeholderText} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.map((entry) => (
                          <SelectItem key={entry.id} value={entry.id}>
                            {entry.topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
