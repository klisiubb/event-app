"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransitionRouter } from "next-view-transitions";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

export interface MultipleSelectFormProps {
  editText: string;
  textFieldName: string;
  currentValue: string[];
  objectId: string;
  fieldName: string;
  validationSchema: z.ZodSchema;
  updateAction: (
    id: string,
    data: Partial<any>
  ) => Promise<{ status: number; message: string }>;
  placeholderText: string;
  initialData: { id: string; name: string }[];
}

export const MultipleSelectForm = ({
  editText,
  textFieldName,
  currentValue,
  objectId,
  fieldName,
  validationSchema,
  updateAction,
  placeholderText,
  initialData,
}: MultipleSelectFormProps & {
  initialData: { id: string; name: string }[];
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<Partial<z.infer<typeof validationSchema>>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      [fieldName]: currentValue || [],
    },
  });

  const { isSubmitting } = form.formState;

  const router = useTransitionRouter();

  useEffect(() => {
    if (currentValue) {
      const selected = currentValue
        .map((id) => {
          const foundItem = initialData.find((item) => item.id === id);
          return foundItem
            ? {
                label: foundItem.name,
                value: id,
              }
            : null;
        })
        .filter((option): option is Option => option !== null);

      setSelectedOptions(selected);
    }
  }, [currentValue, initialData]);
  const onSubmit: SubmitHandler<
    Partial<z.infer<typeof validationSchema>>
  > = async (data) => {
    const lectureToLecture = selectedOptions.map((option) => ({
      id: option.value,
    }));

    const updateData = { ...data, [fieldName]: lectureToLecture };

    try {
      const result = await updateAction(objectId, updateData);

      if (result.status === 400) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Update action failed:", error);
      toast.error("An error occurred while updating.");
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
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => option.label).join(", ")
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
            <MultipleSelector
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={initialData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              placeholder={placeholderText}
              emptyIndicator={
                <p className="text-center text-lg leading-10">Not found...</p>
              }
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
