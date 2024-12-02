import { Prisma } from "@prisma/client";

export type WorkshopWithQRCode = Prisma.WorkshopGetPayload<{
  include: {
    qrcode: true;
  };
}>;
export type WorkshopWithLectures = Prisma.WorkshopGetPayload<{
  include: {
    lecturers: true;
  };
}>;
