import { z } from "zod";

export const LectureFormSchema = z.object({
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
  description: z
    .string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string.",
    })
    .min(50, { message: "Description must be at least 50 characters long." })
    .max(500, {
      message: "Lecture topic must be at most 500 characters long.",
    })
    .trim(),
  room: z
    .string({
      required_error: "Room is required.",
      invalid_type_error: "Room must be a string.",
    })
    .min(4, { message: "Room must be at least 4 characters long." })
    .max(10, {
      message: "Room  must be at most 10 characters long.",
    })
    .trim(),
  isPublished: z.boolean(),
  startDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "Start date must be in the future.",
  }),
  endDate: z.coerce.date().refine((data) => data > new Date(), {
    message: "End date must be in the future.",
  }),
  imageUrl: z.string().url(),
});

export type LectureFormSchemaType = z.infer<typeof LectureFormSchema>;
