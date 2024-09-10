"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";
import {
  LectureFormSchema,
  LectureFormSchemaType,
} from "@/schemas/admin/lecture";
import { useRouter } from "next/navigation";
import { UpdateLecture } from "@/actions/admin/lecture/update";

interface StartDateFormProps {
  startDate: Date | null;
  lectureId: string;
}

export function StartDateForm({ startDate, lectureId }: StartDateFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const form = useForm<Partial<LectureFormSchemaType>>({
    resolver: zodResolver(LectureFormSchema.pick({ startDate: true })),
    defaultValues: {
      startDate: startDate || new Date(), // Default to current date if no startDate
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<Partial<LectureFormSchemaType>> = async (
    data
  ) => {
    const response = await UpdateLecture(lectureId, data);
    if (response.status === 400) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setIsEditing(false);
      router.refresh();
    }
  };

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("startDate", date);
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("startDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      newDate.setHours(parseInt(value, 10));
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue("startDate", newDate);
  }

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="text-primary">Start Date & Time:</div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <span className="hover:font-bold">Cancel</span>
          ) : (
            <span className="flex hover:font-bold">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Edit date & time
            </span>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {startDate ? (
            format(startDate, "MM/dd/yyyy HH:mm")
          ) : (
            <span className="text-sm text-muted-foreground">
              Please set up the start date & time.
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "MM/dd/yyyy HH:mm")
                          ) : (
                            <span>MM/DD/YYYY HH:mm</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="flex">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                        <div className="border-l flex h-[300px] divide-x">
                          <ScrollArea>
                            <div className="flex flex-col p-2">
                              {Array.from({ length: 24 }, (_, i) => i)
                                .reverse()
                                .map((hour) => (
                                  <Button
                                    key={hour}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getHours() === hour
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("hour", hour.toString())
                                    }
                                  >
                                    {hour}
                                  </Button>
                                ))}
                            </div>
                          </ScrollArea>
                          <ScrollArea>
                            <div className="flex flex-col p-2">
                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                (minute) => (
                                  <Button
                                    key={minute}
                                    size="icon"
                                    variant={
                                      field.value &&
                                      field.value.getMinutes() === minute
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange(
                                        "minute",
                                        minute.toString()
                                      )
                                    }
                                  >
                                    {minute}
                                  </Button>
                                )
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
}
