"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
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
          <Link className="hover:text-primary" prefetch href="/staff">
            Staff
          </Link>
          <Link className="hover:text-primary" prefetch href="/agenda">
            Agenda
          </Link>
          {isAdmin ? (
            <Link
              className="text-destructive font-semibold hover:text-primary"
              prefetch
              href="/admin"
            >
              Admin panel
            </Link>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <>
              <Link
                className=" font-semibold hover:text-primary"
                prefetch
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                href="/api/auth/logout"
                className="hover:text-primary"
                prefetch={false}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/api/auth/login"
              className="hover:text-primary"
              prefetch={false}
            >
              Login
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
          <ModeToggle />
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden">
          <div className="flex flex-col space-y-4 pb-4 ms-4">
            <Link
              className="hover:text-primary"
              prefetch
              href="/staff"
              onClick={() => setIsMenuOpen(false)}
            >
              Staff
            </Link>
            <Link
              className="hover:text-primary"
              prefetch
              href="/agenda"
              onClick={() => setIsMenuOpen(false)}
            >
              Agenda
            </Link>
            {isAdmin ? (
              <Link
                className="text-destructive font-semibold hover:text-primary"
                prefetch
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin panel
              </Link>
            ) : (
              <></>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  className="hover:text-primary"
                  prefetch
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="hover:text-primary"
                  prefetch={false}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/login"
                className="hover:text-primary"
                prefetch={false}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
