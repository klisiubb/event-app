"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { Link } from "next-view-transitions";
import { ModeToggle } from "@/components/mode-toggle";
import { redirect } from "next/navigation";

export const NavbarRoutes = () => {
  const { getUser, getAccessToken, isLoading } = useKindeBrowserClient();
  const user = getUser();
  const token = getAccessToken();
  const isAdmin = token?.roles?.some((role) => role.key === "admin") || false;

  if (isLoading) {
    <>Loading...</>;
  }
  if (!user || !isAdmin) {
    redirect("/api/auth/login");
  }
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
          Log out
        </Link>
        <ModeToggle />
      </div>
    </>
  );
};
