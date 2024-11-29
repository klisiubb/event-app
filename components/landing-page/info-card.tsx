import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { BlurFade } from "../ui/blur-fade";

const InfoCard = ({
  name,
  icon: Icon,
  description,
}: {
  name: string;
  icon: LucideIcon;
  description: string;
}) => {
  return (
    <BlurFade inView duration={1}>
      <Card className="h-64 w-80 rounded-md flex items-center justify-center shadow-lg bg-primary shadow-primary/30 hover:scale-105 hover:opacity-90">
        <div className="flex flex-col items-center justify-center align-middle">
          <div className="flex flex-col items-center justify-center">
            <Icon className="w-10 h-10 " />
            <span className="font-extrabold text-xl mt-2">{name}</span>
          </div>
          <div className="mt-2 mx-6 text-sm text-center tracking-wider">
            {description}
          </div>
        </div>
      </Card>
    </BlurFade>
  );
};

export default InfoCard;