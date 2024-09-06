"use client";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export const NavbarRoutes = () => {
  return (
    <>
      <div className="flex items-center text-xs md:text-sm gap-x-4 ml-auto ">
        <Link
          href="/api/auth/logout"
          prefetch={false}
          className="hover:text-primary"
        >
          Sign out
        </Link>
        <ModeToggle />
      </div>
    </>
  );
};
