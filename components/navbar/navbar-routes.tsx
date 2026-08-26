"use client";
import { Link } from "next-view-transitions";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";

export const NavbarRoutes = () => {
  return (
    <>
      <div className="flex items-center text-xs md:text-sm gap-x-4 ml-auto ">
        <Link href="/" className="hover:text-primary">
          Go home
        </Link>
        <a
          href="#"
          className="hover:text-primary"
          onClick={async (e) => {
            e.preventDefault();
            await authClient.signOut();
            window.location.href = "/";
          }}
        >
          Logout
        </a>
        <ModeToggle />
      </div>
    </>
  );
};
