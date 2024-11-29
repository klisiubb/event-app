"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Link } from "next-view-transitions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, getAccessToken, isLoading } =
    useKindeBrowserClient();
  const token = getAccessToken();
  const isAdmin = token?.roles?.some((role) => role.key === "admin") || false;
  if (isLoading) {
    <>Loading...</>;
  }
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
          <Link prefetch href="/">
            Home
          </Link>
          <Link prefetch href="/agenda">
            Agenda
          </Link>
          {isAdmin ? (
            <Link prefetch href="/admin">
              Admin panel
            </Link>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <Link
              href="/api/auth/logout"
              className="hover:text-primary"
              prefetch={false}
            >
              Log out
            </Link>
          ) : (
            <Link
              href="/api/auth/login"
              className="hover:text-primary"
              prefetch={false}
            >
              Log in
            </Link>
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
            <Link prefetch href="/">
              Home
            </Link>
            <Link prefetch href="/agenda">
              Agenda
            </Link>
            {isAdmin ? (
              <Link prefetch href="/admin">
                Admin panel
              </Link>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <Link
                href="/api/auth/logout"
                className="hover:text-primary"
                prefetch={false}
              >
                Log out
              </Link>
            ) : (
              <Link
                href="/api/auth/login"
                className="hover:text-primary"
                prefetch={false}
              >
                Log in
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
