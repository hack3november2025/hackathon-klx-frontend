"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/src/components/ui/navigation-menu";
import { cn } from "@/src/lib/utils";
import { Home, Grid, Briefcase, FileText, Sun, Moon } from "lucide-react";
import { Logo } from "./logo";

const pages = [
  { title: "Home", href: "/", icon: Home },
  { title: "Dashboard", href: "/dashboard", icon: Grid },
  { title: "Create Offer", href: "/job-offer", icon: Briefcase },
  { title: "Jobs", href: "/jobs", icon: FileText },
];

function SiteNavigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      <nav className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {pages.map((p) => (
              <NavigationMenuItem key={p.title}>
                <NavigationMenuLink href={p.href} className="px-2">
                  <div className="flex items-center gap-2">
                    {React.createElement(p.icon, { className: "w-4 h-4" })}
                    <span className="text-sm">{p.title}</span>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md border p-1",
            "bg-background text-muted-foreground"
          )}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}

export { SiteNavigation };
