import {
  BookOpen,
  CircleDollarSign,
  LineChart,
  PencilRuler,
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
    href: "/admin/qrcode",
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
    icon: CircleDollarSign,
    label: "Sponsors",
    href: "/admin/sponsor",
  },
  {
    icon: LineChart,
    label: "Stats",
    href: "/admin/stats",
  },
];
