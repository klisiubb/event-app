import { z } from "zod";

export const QRCodeFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(10, { message: "QRCode name must be at least 10 characters long." })
    .max(150, {
      message: "QRCode name must be at most 150 characters long.",
    })
    .trim(),
  isPublished: z.boolean(),
  maxUses: z.coerce
    .number({
      message: "Max uses must be a number.",
    })
    .int({
      message: "Max uses must be an integer.",
    }),
  value: z.coerce
    .number({
      message: "Value must be a number.",
    })
    .int({
      message: "Value must be an integer.",
    })
    .gte(1, {
      message: "Value  must be greater or equal to one.",
    })
    .optional(),
});

export type QRCodeFormSchemaType = z.infer<typeof QRCodeFormSchema>;
