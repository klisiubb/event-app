import { ActionReturnType } from "@/interfaces/actionReturnType";
import { ZodSchema } from "zod";

export interface TextFormProps {
  editText: string;
  placeholderText: string;
  textFieldName: string;
  fieldName: string;
  textValue: string | null;
  objectId: string;
  validationSchema: ZodSchema;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
}
