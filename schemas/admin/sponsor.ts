import { z } from "zod";

export const SponsorFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(10, { message: "Name must be at least 10 characters long." })
    .max(150, {
      message: "Name must be at most 150 characters long.",
    })
    .trim(),
  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string.",
    })
    .min(50, { message: "Description must be at least 50 characters long." })
    .max(500, {
      message: "Description must be at most 500 characters long.",
    })
    .trim(),
  imageUrl: z.string().url(),
  websiteUrl: z.string().url(),
});

export type WorkshopFormSchemaType = z.infer<typeof SponsorFormSchema>;
