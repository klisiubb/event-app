"use client";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { ImageFormProps } from "@/interfaces/admin/form/image-form.interface";

export const ImageForm = ({
  imageUrl,
  objectId,
  updateAction,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useTransitionRouter();

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="text-primary">Image:</div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <span className="hover:font-bold">Cancel</span>}
          {!isEditing && !imageUrl && (
            <span className="flex hover:font-bold">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </span>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-10 rounded-md">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-60 mt-2">
            <div className="relative w-full max-w-xl h-full">
              <Image
                alt="Image"
                fill
                className="object-contain rounded-md"
                src={imageUrl}
              />
            </div>
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const imageUrl = res[0].appUrl;
              updateAction(objectId, { imageUrl });
              toast.success("Image uploaded successfully");
              setIsEditing(false);
              router.refresh();
            }}
            onUploadError={(res) => {
              console.log(res);
              toast.error("Error uploading image");
            }}
          />
        </div>
      )}
    </div>
  );
};
