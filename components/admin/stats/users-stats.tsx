import {
  GraduationCapIcon,
  HeartHandshakeIcon,
  PresentationIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { OverviewItem } from "./overview-item";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { BlurFade } from "@/components/ui/blur-fade";
import DualPieChart from "./charts/charts/dual-pie-chart";

const UserStats = async () => {
  const users = await prisma.user.findMany();

  /* Users filters */
  const usersWithUserRole = users.filter((users) => users.role === Role.USER);
  const usersWithLectureRole = users.filter(
    (users) => users.role === Role.LECTURER
  );
  const usersWithVolunteerRole = users.filter(
    (users) => users.role === Role.VOLUNTEER
  );
  const usersWithAdminRole = users.filter((users) => users.role === Role.ADMIN);

  const usersThatWillAttendWorkshop = users.filter(
    (users) => users.workshopToAttendId !== null
  );
  const usersPresentAtEvent = users.filter(
    (users) => users.role === Role.USER && users.isPresentAtEvent === true
  );
  const usersPresentAtWorkshop = users.filter(
    (users) =>
      users.role === Role.USER &&
      users.isPresentAtWorkshop === true &&
      users.workshopToAttendId !== null
  );

  const totalUsersWithoutPresence =
    usersWithUserRole.length - usersPresentAtEvent.length;

  return (
    <BlurFade inView delay={0.1}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2">
        <OverviewItem
          title="Users"
          subTitle="Users that are not part of stuff or lecturers."
          icon={UsersIcon}
          number={usersWithUserRole.length}
        />
        <OverviewItem
          title="Lecturers"
          subTitle="Users that are going to lecture others users."
          icon={GraduationCapIcon}
          number={usersWithLectureRole.length}
        />
        <OverviewItem
          title="Volunteers"
          subTitle="Users that volunteer at event."
          icon={HeartHandshakeIcon}
          number={usersWithVolunteerRole.length}
        />
        <OverviewItem
          title="Admins"
          subTitle="Users that make important decisions."
          icon={ShieldIcon}
          number={usersWithAdminRole.length}
        />
        <OverviewItem
          title="Workshop attenders"
          subTitle="Users that signed for one of limited Workshops."
          icon={PresentationIcon}
          number={usersThatWillAttendWorkshop.length}
        />
        <OverviewItem
          title="Presence"
          subTitle="Users that confirmed theirs presence onsite."
          icon={PresentationIcon}
          number={usersPresentAtEvent.length}
        />
        <OverviewItem
          title="Workshop presence"
          subTitle="Users that confirmed theirs presence on Workshop."
          icon={PresentationIcon}
          number={usersPresentAtWorkshop.length}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 py-2">
        <DualPieChart
          value1={totalUsersWithoutPresence}
          value1Name="Registered Users"
          value2={usersPresentAtEvent.length}
          value2Name="Confirmed Attendees"
          title="User Attendance Overview"
          description="Comparison of registered users vs. confirmed attendees"
        />
        <DualPieChart
          value1={totalUsersWithoutPresence}
          value1Name="Registered Users"
          value2={usersPresentAtEvent.length}
          value2Name="Confirmed Attendees"
          title="User Attendance Overview"
          description="Comparison of registered users vs. confirmed attendees"
        />
        <DualPieChart
          value1={totalUsersWithoutPresence}
          value1Name="Registered Users"
          value2={usersPresentAtEvent.length}
          value2Name="Confirmed Attendees"
          title="User Attendance Overview"
          description="Comparison of registered users vs. confirmed attendees"
        />
        <DualPieChart
          value1={totalUsersWithoutPresence}
          value1Name="Registered Users"
          value2={usersPresentAtEvent.length}
          value2Name="Confirmed Attendees"
          title="User Attendance Overview"
          description="Comparison of registered users vs. confirmed attendees"
        />
      </div>
    </BlurFade>
  );
};

export default UserStats;
