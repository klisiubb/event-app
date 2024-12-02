import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { StaffCard } from "../staff-card";

export const StaffSection = async ({ team }: { team: User[] }) => {
  return (
    <section id="team" className="container lg:w-[75%] py-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl text-primary mb-2 sm:mb-4 tracking-wider font-bold uppercase mt-8">
          Meet our staff
        </h2>

        <h3 className="md:w-1/2 mx-auto text-base sm:text-lg text-muted-foreground mb-8">
          We couldn&apos;t make it happen without them. We appreciate your
          awesome help.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>

      <div className="mt-8">
        <div className="flex flex-col max-w-screen-xl mx-auto text-center items-center gap-4 sm:gap-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            What about{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
              sponsors?
            </span>
          </h1>
          <p className="max-w-screen-sm mx-auto text-base sm:text-xl text-muted-foreground">
            Sponsors are an important part of our event. We couldn&apos;t give
            you amazing rewards without them!
          </p>

          <Button
            variant="ringHover"
            size="lg"
            asChild
            className="w-full sm:w-auto mt-4"
          >
            <Link href="/sponsors">Check out sponsors!</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
