import { auth } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({ headers: req.headers });
      const isAdmin = session?.user.role === "ADMIN";

      if (!session) throw new UploadThingError("Please sign in to upload photo.");
      if (!isAdmin) throw new UploadThingError("Unauthorized to upload photo.");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
