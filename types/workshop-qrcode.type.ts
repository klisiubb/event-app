import { Prisma } from "@prisma/client";

export type WorkshopWithQRCode = Prisma.WorkshopGetPayload<{
  include: {
    qrcode: true;
  };
}>;
