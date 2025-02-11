import { Role } from "@prisma/client";
import { z } from "zod";

export const UserFormSchema = z.object({
  workshopToAttendId: z
    .string({
      required_error: "Workshop is required.",
      invalid_type_error: "Workshop id must be a string.",
    })
    .uuid()
    .optional(),
  lectureToLecture: z
    .array(
      z
        .string({
          required_error: "At least one lecture is required.",
          invalid_type_error: "Lecture id must be a string.",
        })
        .uuid()
    )
    .optional(),
  workshopToLecture: z
    .array(
      z
        .string({
          required_error: "At least one workshop is required.",
          invalid_type_error: "Workshop id must be a string.",
        })
        .uuid()
    )
    .optional(),
  firstName: z
    .string({
      required_error: "First name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(30, {
      message: "Name must be at most 30 characters long.",
    })
    .trim(),
  lastName: z
    .string({
      required_error: "First name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(30, {
      message: "Name must be at most 30 characters long.",
    })
    .trim(),
  role: z.enum([Role.ADMIN, Role.USER, Role.VOLUNTEER, Role.LECTURER]),
  imageUrl: z.string().url().optional(),
  position: z.string().optional(),
  website: z.string().url().optional(),
});

export type UserFormSchemaType = z.infer<typeof UserFormSchema>;
