import {
  BookOpen,
  CircleDollarSign,
  GraduationCap,
  LineChart,
  PencilRuler,
  PersonStanding,
  QrCode,
  Trophy,
  Users,
} from "lucide-react";

export const adminRoutes = [
  {
    icon: BookOpen,
    label: "Lectures",
    href: "/admin/lecture",
  },
  {
    icon: PencilRuler,
    label: "Workshops",
    href: "/admin/workshop",
  },
  {
    icon: QrCode,
    label: "QR codes",
    href: "/admin/qr",
  },
  {
    icon: Trophy,
    label: "Rewards",
    href: "/admin/reward",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/user",
  },
  {
    icon: PersonStanding,
    label: "Stuff",
    href: "/admin/stuff",
  },
  {
    icon: CircleDollarSign,
    label: "Sponsors",
    href: "/admin/sponsor",
  },
  {
    icon: GraduationCap,
    label: "Lecturers",
    href: "/admin/lecturer",
  },
  {
    icon: LineChart,
    label: "Stats",
    href: "/admin/stats",
  },
];
