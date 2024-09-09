import { ZodObject, ZodSchema } from "zod";
import { ActionReturnType } from "../actionReturnType";

export interface EditTextFormProps {
  defaultValue?: string;
  formSchema: ZodSchema;
  labelText: string;
  placeholderText: string;
  fieldName: string;
  editAction: (arg0: any) => Promise<ActionReturnType>;
}
