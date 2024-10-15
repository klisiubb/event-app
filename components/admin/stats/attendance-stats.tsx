import { UsersIcon, PresentationIcon } from "lucide-react";
import React from "react";
import { OverviewItem } from "./overview-item";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { BlurFade } from "@/components/ui/blur-fade";
import DualPieChart from "./charts/charts/dual-pie-chart";

const AttendanceStats = async () => {
  const users = await prisma.user.findMany();

  /* Users filters */
  const usersWithUserRole = users.filter((users) => users.role === Role.USER);
  const usersPresentAtEvent = users.filter(
    (users) => users.role === Role.USER && users.isPresentAtEvent === true
  );

  const usersRegisteredForWorkshop = usersWithUserRole.filter(
    (users) => users.workshopToAttendId !== null
  );
  const usersPresentAtWorkshop = users.filter(
    (users) => users.role === Role.USER && users.isPresentAtWorkshop === true
  );

  return (
    <BlurFade inView delay={0.1}>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex-grow bg-secondary p-4 rounded-lg">
            <h1 className="text-xl font-bold text-primary">
              Event attendance stats
            </h1>
            <p className="mt-4">
              This section provides an overview of how many users have signed up
              for the event, excluding administrators, lecturers, and
              volunteers.
              <br />
              Additionally, it displays how many of these users have confirmed
              their attendance by having their profile QR codes scanned by
              volunteers using the mobile application.
            </p>
          </div>

          <OverviewItem
            title="Users"
            subTitle="Users that have registered for an event."
            icon={UsersIcon}
            number={usersWithUserRole.length}
          />

          <OverviewItem
            title="Presence"
            subTitle="Users that confirmed their presence onsite."
            icon={PresentationIcon}
            number={usersPresentAtEvent.length}
          />
        </div>

        <div className="flex justify-center">
          <DualPieChart
            value1={usersWithUserRole.length}
            value1Name="Registered Users"
            value2={usersPresentAtEvent.length}
            value2Name="Confirmed Attendees"
            title="User Attendance Overview"
            description="Comparison of registered users vs. confirmed attendees"
          />
        </div>
        <div className="flex justify-center">
          <DualPieChart
            value1={usersRegisteredForWorkshop.length}
            value1Name="Registered Users"
            value2={usersPresentAtWorkshop.length}
            value2Name="Confirmed Attendees"
            title="User Attendance Overview"
            description="Comparison of registered users vs. confirmed attendees"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex-grow bg-secondary p-4 rounded-lg">
            <h1 className="text-xl font-bold text-primary">
              Event workshops stats
            </h1>
            <p className="mt-4">
              This section provides an overview of how many users have signed up
              for the workshops, excluding administrators, lecturers, and
              volunteers.
              <br />
              Additionally, it displays how many of these users have confirmed
              their attendance by having their profile QR codes scanned by
              volunteers using the mobile application at workshop.
            </p>
          </div>

          <OverviewItem
            title="Attenders"
            subTitle="Users that have registered for an workshop during event."
            icon={UsersIcon}
            number={usersRegisteredForWorkshop.length}
          />

          <OverviewItem
            title="Presence"
            subTitle="Users that confirmed their presence at workshop during event."
            icon={PresentationIcon}
            number={usersPresentAtWorkshop.length}
          />
        </div>
      </div>
    </BlurFade>
  );
};

export default AttendanceStats;
