"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { UpdateLecture } from "@/actions/admin/lecture/update";

interface ImageFormProps {
  imageUrl: string | null;
  lectureId: string;
}

export const ImageForm = ({ imageUrl, lectureId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="text-primary">Lecture image:</div>
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
            <ImageIcon className="h-10 w-10" />
          </div>
        ) : (
          <div className="relative w-full max-w-xl h-60 mt-2">
            <Image
              alt="Lecture image"
              fill
              className="object-contain rounded-md"
              src={imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const imageUrl = res[0].appUrl;
              UpdateLecture(lectureId, { imageUrl });
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
