import { Card } from "@/components/ui/card";
import { TypingAnimation } from "../ui/typing-animation";
import { NumberTicker } from "../ui/number-ticker";

const StatsCard = ({
  name,

  stat,
}: {
  name: string;

  stat: number;
}) => {
  return (
    <>
      <Card
        className="h-32 w-64 rounded-md border border-solid
      border-primary/80 flex items-center justify-center shadow-lg shadow-primary/30"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-primary text-x md:text-xl xl:text-2xl">
            {name}
          </span>
          <NumberTicker
            value={stat}
            className="mt-2 text-base text-center font-semibold md:text-lg"
          />
        </div>
      </Card>
    </>
  );
};

export default StatsCard;
