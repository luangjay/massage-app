import * as React from "react";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { getServerSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AuthDialog } from "./auth-dialog";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { Button } from "./ui/button";
import { UserAccountNav } from "./user-account-nav";

type HeaderProps = {
  variant?: "default" | "home";
};

export async function Header({ variant = "default", ...props }: HeaderProps) {
  const session = await getServerSession();

  return (
    <header
      className={cn(
        "left-0 right-0 top-0 z-50 ",
        variant === "home" ? "relative" : "sticky bg-accent-3"
      )}
      {...props}
    >
      <div className="container flex h-32 items-center justify-end px-16">
        <div className="flex h-full w-full items-center justify-center gap-20">
          <div className="flex flex-1 items-center justify-end gap-8">
            <NavItem variant={variant} href="/" title="Home" />
            <NavItem variant={variant} href="/#services" title="Services" />
          </div>
          <Link
            className={cn(
              "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-8",
              variant === "home" ? "text-accent-contrast" : "text-accent-9"
            )}
            href="/"
          >
            <Logo />
          </Link>
          <div className="flex flex-1 items-center justify-start gap-8">
            <NavItem variant={variant} href="/shops" title="Discover" />
            <NavItem variant={variant} href="/reservations" title="Embrace" />
          </div>
        </div>
        <div className="absolute bottom-0 top-0 flex items-center justify-center gap-4">
          {session ? (
            <UserAccountNav user={session.user}>
              <Button
                className={cn(
                  "p-1",
                  variant === "home"
                    ? "text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
                    : null
                )}
                variant={variant === "home" ? "ghost" : "soft"}
                size="text"
              >
                <PersonIcon className="h-4 w-4 shrink-0" />
              </Button>
            </UserAccountNav>
          ) : (
            <AuthDialog>
              <Button
                className={cn(
                  "p-1",
                  variant === "home"
                    ? "text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
                    : null
                )}
                variant={variant === "home" ? "ghost" : "soft"}
                size="text"
              >
                <PersonIcon className="h-4 w-4 shrink-0" />
              </Button>
            </AuthDialog>
          )}
        </div>
      </div>
    </header>
  );
}
