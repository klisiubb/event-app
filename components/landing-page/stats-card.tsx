import { Card } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

interface StatsCardProps {
  name: string;
  description: string;
  value: number;
}

const StatsCard = ({ name, value, description }: StatsCardProps) => {
  return (
    <BlurFade inView duration={1}>
      <Card className="relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border-2 border-primary/20 hover:border-primary/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 p-6 flex flex-col h-full">
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <div className="mt-2 bg-primary/10 p-2 rounded-md inline-block group-hover:bg-primary/20 transition-colors duration-300">
              <NumberTicker
                value={value}
                className="text-3xl font-bold text-primary"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex-grow">
            {description}
          </p>
          <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary/20 to-primary/40 group-hover:from-primary/40 group-hover:to-primary/60 transition-colors duration-300" />
        </div>
      </Card>
    </BlurFade>
  );
};

export default StatsCard;
