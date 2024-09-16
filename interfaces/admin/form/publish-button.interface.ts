import { ActionReturnType } from "@/interfaces/actionReturnType";

export interface PublishButtonProps {
  objectId: string;
  objectName: string;
  isPublished: boolean;
  updateAction: (id: string, data: any) => Promise<ActionReturnType>;
}
