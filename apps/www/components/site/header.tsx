"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { StatusBeacon, GeoBadge } from "@geocn/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-background/95 backdrop-blur dark:border-zinc-800/80">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-50"
          >
            <span className="flex size-7 items-center justify-center rounded border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
              <Compass className="size-4 text-zinc-900 dark:text-zinc-100" />
            </span>
            <span>GeoCN</span>
          </Link>
          <StatusBeacon status="info" className="hidden lg:inline-flex text-[11px]">
            Phase 2A Architecture
          </StatusBeacon>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {siteConfig.mainNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                  isActive
                    ? "font-semibold text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                <span>{item.title}</span>
                {item.badge ? (
                  <span className="rounded bg-zinc-200/70 px-1 py-0.2 font-mono text-[9px] uppercase tracking-wider text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Utilities & Theme Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="GitHub Repository"
          >
            <Github className="size-4" />
          </Link>
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex size-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 md:hidden dark:border-zinc-800 dark:text-zinc-300"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <div className="border-b border-zinc-200 bg-background px-4 py-4 md:hidden dark:border-zinc-800">
          <nav className="flex flex-col gap-2">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Navigation
            </div>
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith(item.href)
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                )}
              >
                <span>{item.title}</span>
                {item.badge ? <GeoBadge variant="verified">{item.badge}</GeoBadge> : null}
              </Link>
            ))}

            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mt-3 mb-1">
              Ecosystem
            </div>
            {siteConfig.secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
