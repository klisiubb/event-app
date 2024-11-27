"use client";
import { Link } from "next-view-transitions";
import { ModeToggle } from "../mode-toggle";
import { useUser } from "@stackframe/stack";
import { Button } from "../ui/button";

export const NavbarRoutes = () => {
  const user = useUser({ or: "redirect" });
  return (
    <>
      <div className="flex items-center text-xs md:text-sm gap-x-4 ml-auto ">
        <Link href="/" className="hover:text-primary">
          Go home
        </Link>
        <Button
          variant="link"
          className="hover:text-primary text-secondary-foreground"
          onClick={async () => await user.signOut()}
        >
          Sign out
        </Button>
        <ModeToggle />
      </div>
    </>
  );
};
