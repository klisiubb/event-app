import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const { getUser, getRoles } = getKindeServerSession();

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await getUser();
      const roles = await getRoles();
      const isAdmin = roles?.some((role) => role.key === "admin") || false;

      if (!user) throw new UploadThingError("Please sign in to upload photo.");
      if (!user) throw new UploadThingError("Unauthorized to upload photo.");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
