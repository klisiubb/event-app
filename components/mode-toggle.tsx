"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        aria-label="Loading theme switcher"
        variant="secondary"
        size="icon"
        disabled={true}
      ></Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
    >
      {dark ? (
        <Sun
          className="hover:cursor-pointer hover:text-primary"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="hover:cursor-pointer hover:text-primary"
          aria-hidden="true"
        />
      )}
    </Button>
  );
}
