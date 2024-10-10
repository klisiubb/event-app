import { z } from "zod";

export const RewardFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(10, { message: "Reward name must be at least 10 characters long." })
    .max(150, {
      message: "Reward name must be at most 150 characters long.",
    })
    .trim(),
  isPublished: z.boolean(),
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
  quantity: z.coerce
    .number({
      message: "Quantity must be a number.",
    })
    .int({
      message: "Quantity must be an integer.",
    })
    .gte(1, {
      message: "Quantity must be greater or equal to one.",
    }),
});

export type RewardFormSchemaType = z.infer<typeof RewardFormSchema>;
