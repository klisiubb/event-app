import { ActionReturnType } from "@/interfaces/actionReturnType";

export interface ImageFormProps {
  imageUrl: string | null;
  objectId: string;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
}
