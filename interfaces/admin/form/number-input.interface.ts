import { ActionReturnType } from "@/interfaces/actionReturnType";
import { ZodSchema } from "zod";

export interface NumberFormProps {
  editText: string;
  numberFieldName: string;
  numberValue?: number | null;
  objectId: string;
  fieldName: string;
  validationSchema: ZodSchema;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
  placeholderText: string;
}
