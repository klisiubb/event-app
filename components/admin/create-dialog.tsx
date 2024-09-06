"use client";
import React, { FC } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateFormProps } from "@/interfaces/admin/createFormProps";
import { toast } from "sonner";

const CreateDialog: FC<CreateFormProps> = ({
  titleText,
  buttonText,
  underTitleText,
  formSchema,
  route,
  labelText,
  descriptionText,
  placeholderText,
  fieldName,
  createAction,
}) => {
  type FormType = z.infer<typeof formSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: FormType) => {
    const data = await createAction(values);
    if (data.status === 400) {
      toast.error(data.message);
      form.setError(fieldName, { message: data.message });
    } else {
      form.resetField(fieldName, { defaultValue: "" });
      toast.success(data.message);
      router.push(`/admin/${route}/edit/${data.id}`);
    }
  };

  const { isSubmitting, isSubmitSuccessful } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 md:mt-4 hover:animate-bounce hover:font-bold">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 md:mx-28">
        <DialogHeader>
          <DialogTitle className="font-bold md:text-xl">
            {titleText}
          </DialogTitle>
          <DialogDescription>{underTitleText}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelText}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={placeholderText}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{descriptionText}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="grid grid-cols-4 gap-2 items-center justify-center pb-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => form.reset()}
                >
                  Close
                </Button>
              </DialogClose>
              {isSubmitting ? (
                <Button disabled className="col-start-3 col-span-2">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </Button>
              ) : (
                <Button
                  className="col-start-3 col-span-2"
                  disabled={isSubmitting || isSubmitSuccessful}
                  type="submit"
                  variant={
                    Object.keys(form.formState.errors).length > 0
                      ? "destructive"
                      : "default"
                  }
                >
                  Create
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
