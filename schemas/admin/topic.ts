import { z } from "zod";

export const TopicFormSchema = z.object({
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

export type TopicFormSchemaType = z.infer<typeof TopicFormSchema>;
