"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ModeToggle } from "../mode-toggle";
import { Link } from "next-view-transitions";
const NavLink = ({
  href,
  children,
  prefetch,
}: {
  href: string;
  children: React.ReactNode;
  prefetch: boolean;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, getPermission } = useKindeBrowserClient();
  const isAdmin = getPermission("admin");

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="ms-4 font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive"
          >
            Event App
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLink prefetch href="/">
            Home
          </NavLink>
          <NavLink prefetch href="/agenda">
            Agenda
          </NavLink>
          {isAdmin?.isGranted ? (
            <NavLink prefetch href="/admin">
              Admin panel
            </NavLink>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <NavLink href="/api/auth/logout" prefetch={false}>
              Log out
            </NavLink>
          ) : (
            <NavLink href="/api/auth/login" prefetch={false}>
              Login
            </NavLink>
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden">
          <div className="flex flex-col space-y-4 pb-4 ms-4">
            <NavLink prefetch href="/agenda">
              Agenda
            </NavLink>
            <NavLink prefetch href="/about">
              About
            </NavLink>
            {isAdmin ? (
              <NavLink prefetch href="/admin">
                Admin panel
              </NavLink>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <NavLink href="/api/auth/logout" prefetch={false}>
                Log out
              </NavLink>
            ) : (
              <NavLink href="/api/auth/login" prefetch={false}>
                Log out
              </NavLink>
            )}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
