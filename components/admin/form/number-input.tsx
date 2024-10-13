"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransitionRouter } from "next-view-transitions";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { NumberFormProps } from "@/interfaces/admin/form";

export const NumberForm = ({
  editText,
  numberFieldName,
  numberValue,
  objectId,
  fieldName,
  validationSchema,
  updateAction,
  placeholderText,
}: NumberFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<Partial<z.infer<typeof validationSchema>>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      [fieldName]: numberValue || null,
    },
  });

  const { isSubmitting } = form.formState;

  const router = useTransitionRouter();

  const onSubmit: SubmitHandler<
    Partial<z.infer<typeof validationSchema>>
  > = async (numberValue) => {
    const data = await updateAction(objectId, numberValue);

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
        <div className="text-primary">{numberFieldName}</div>
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
          {numberValue ? (
            numberValue
          ) : (
            <span className="font-bold text-red-500">Not yet set</span>
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
                    <Input
                      {...field}
                      type="number"
                      placeholder={placeholderText}
                      disabled={isSubmitting}
                    />
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
