"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TopicFormSchemaType } from "@/schemas/admin/topic";
import { UpdateLecture } from "@/actions/admin/lecture/update";

interface TopicFormProps {
  topic: string;
  lectureId: string;
}

const FormSchema = z.object({
  topic: z
    .string({
      required_error: "Topic is required.",
      invalid_type_error: "Topic must be a string.",
    })
    .min(10, { message: "Lecture topic must be at least 10 characters long." })
    .max(150, {
      message: "Lecture topic must be at most 150 characters long.",
    })
    .trim(),
});

export const TopicForm = ({ topic, lectureId }: TopicFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: topic,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: TopicFormSchemaType) => {
    const { topic } = values;
    const data = await UpdateLecture(lectureId, topic);
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
        <div className="text-primary">Topic:</div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <span className="hover:font-bold">Cancel</span>
          ) : (
            <span className="flex hover:font-bold">
              <Pencil className="h-4 w-4 mr-2" />
              Edit topic
            </span>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{topic}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
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
