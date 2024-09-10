"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateLecture } from "@/actions/admin/lecture/update";
import {
  LectureFormSchema,
  LectureFormSchemaType,
} from "@/schemas/admin/lecture";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface DescriptionFormProps {
  description: string | null;
  lectureId: string;
}

export const DescriptionForm = ({
  description,
  lectureId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<Partial<LectureFormSchemaType>>({
    resolver: zodResolver(LectureFormSchema.pick({ description: true })),
    defaultValues: {
      description: description ? description : "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<Partial<LectureFormSchemaType>> = async (
    description
  ) => {
    const data = await UpdateLecture(lectureId, description);
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
      <div className=" font-medium flex items-center justify-between">
        <div className="text-primary">Description:</div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <span className="hover:font-bold">Cancel</span>
          ) : (
            <span className="flex hover:font-bold">
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </span>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {description ? (
            description
          ) : (
            <span className="text-sm text-muted-foreground">
              {" "}
              Please set up the description.
            </span>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="e.g `React for beginners!`"
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
