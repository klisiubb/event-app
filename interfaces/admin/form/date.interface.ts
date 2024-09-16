import { ActionReturnType } from "@/interfaces/actionReturnType";
import { ZodSchema } from "zod";

export interface DateFormProps {
  editText: string;
  dateFieldName: string;
  dateValue: Date;
  objectId: string;
  fieldName: string;
  validationSchema: ZodSchema;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
}
