import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event App - 404",
  description: "The page you are looking for does not exist",
};

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="animate-shake animate-once animate-duration-[2000ms] animate-ease-in-out text-center">
        <h1 className="text-5xl md:text-8xl font-bold text-primary animate-pulse hover:animate-shake">
          {" "}
          404 - Not Found
        </h1>
        <p className="my-8 text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button
          asChild
          className="w-3/4 md:w-1/3 animate-bounce hover:animate-pulse"
        >
          <Link href="/">Go home!</Link>
        </Button>
      </div>
    </div>
  );
}
