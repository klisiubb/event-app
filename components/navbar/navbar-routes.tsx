"use client";
import { Link } from "next-view-transitions";
import { ModeToggle } from "@/components/mode-toggle";

export const NavbarRoutes = () => {
  return (
    <>
      <div className="flex items-center text-xs md:text-sm gap-x-4 ml-auto ">
        <Link href="/" className="hover:text-primary">
          Go home
        </Link>
        <Link
          href="/api/auth/logout"
          className="hover:text-primary"
          prefetch={false}
        >
          Logout
        </Link>
        <ModeToggle />
      </div>
    </>
  );
};
