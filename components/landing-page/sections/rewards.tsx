import { Reward } from "@prisma/client";
import { RewardCard } from "@/components/landing-page//reward-card";
export const RewardsSection = async ({ rewards }: { rewards: Reward[] }) => {
  return (
    <section id="rewards" className="container lg:w-[75%] py-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl text-primary mb-2 sm:mb-4 tracking-wider font-bold uppercase mt-8">
          Check out our rewards
        </h2>

        <h3 className="md:w-1/2 mx-auto text-base sm:text-lg text-muted-foreground mb-8">
          We respect your time. Scan the QR codes for a chance to win awesome
          rewards.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
      <h3 className="md:w-1/2 mx-auto text-base sm:text-lg text-muted-foreground mt-8 text-center">
        That&apos;s not all! You can find more rewards in our mobile app or by
        visiting sponsors booth.
      </h3>
    </section>
  );
};
