import { Prisma } from "@prisma/client";

const userWithLecturesAndWorkshops = Prisma.validator<Prisma.UserDefaultArgs>()(
  {
    include: { lectureToLecture: true, workshopToLecture: true },
  }
);

export type UserLW = Prisma.UserGetPayload<typeof userWithLecturesAndWorkshops>;
