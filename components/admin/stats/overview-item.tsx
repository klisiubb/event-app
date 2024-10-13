import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon, Users } from "lucide-react";

interface OverviewItemProps {
  title: string;
  number: number;
  subTitle: string;
  icon: LucideIcon;
}

export const OverviewItem = ({
  title,
  number,
  subTitle,
  icon: Icon,
}: OverviewItemProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className=" font-bold text-primary">{title}</CardTitle>
        <Icon className="w-5 h-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
        <p className="text-xs">{subTitle}</p>
      </CardContent>
    </Card>
  );
};
