import { ActionReturnType } from "../actionReturnType";

export interface DeleteFormProps {
  route: string;
  id: string;
  buttonText: string;
  text: string;
  deleteAction: (id: string) => Promise<ActionReturnType>;
}
