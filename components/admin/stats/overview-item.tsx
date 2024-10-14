import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TypingAnimation } from "@/components/ui/typing-animation";
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
    <Card className="relative h-full w-full rounded-xl overflow-hidden">
      <BorderBeam />
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2"
        suppressHydrationWarning
      >
        <TypingAnimation
          text={title}
          className="text-lg font-bold text-primary"
          duration={50}
        />
        <Icon className="w-5 h-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {number > 0 ? <NumberTicker value={number} /> : "0"}
        </div>

        <p className="text-xs mt-2">{subTitle}</p>
      </CardContent>
    </Card>
  );
};
