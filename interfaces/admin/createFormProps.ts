import { ZodObject } from "zod";
import { ActionReturnType } from "../actionReturnType";

export interface CreateFormProps {
  buttonText: string;
  formSchema: ZodObject<any, any>;
  titleText: string;
  underTitleText: string;
  route: string;
  labelText: string;
  descriptionText: string;
  placeholderText: string;
  fieldName: string;
  createAction: (arg0: any) => Promise<ActionReturnType>;
}
