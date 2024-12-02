import { Prisma } from "@prisma/client";

export type LectureWithQRCode = Prisma.LectureGetPayload<{
  include: {
    qrcode: true;
  };
}>;
export type LectureWithLecturers = Prisma.LectureGetPayload<{
  include: {
    lecturers: true;
  };
}>;
