import { Prisma } from "@prisma/client";

export type SponsorWithQRCode = Prisma.SponsorGetPayload<{
  include: {
    qrCode: true;
  };
}>;
