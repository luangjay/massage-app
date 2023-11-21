import * as React from "react";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { getServerSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { LoginDialog } from "./login-dialog";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { UserAccountNav } from "./user-account-nav";

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export async function Header({ className, ...props }: HeaderProps) {
  const session = await getServerSession();

  return (
    <header
      className={cn(
        "sticky left-0 right-0 top-0 z-50 flex h-32 items-center justify-end px-16",
        className
      )}
      {...props}
    >
      <div className="flex h-full w-full items-center justify-center gap-20">
        <div className="flex flex-1 items-center justify-end gap-8">
          <Button
            className="text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
            variant="link"
            size="text"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            className="text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
            variant="link"
            size="text"
            asChild
          >
            <Link href="/">About</Link>
          </Button>
        </div>
        <Link
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-8"
          href="/"
        >
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-start gap-8">
          <Button
            className="text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
            variant="link"
            size="text"
            asChild
          >
            <Link href="/#services">Services</Link>
          </Button>
          <Button
            className="text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
            variant="link"
            size="text"
            asChild
          >
            <Link href="/shops">Discover</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 top-0 flex items-center justify-center gap-4">
        {session ? (
          <UserAccountNav user={session.user}>
            <Button
              className="h-6 w-6 p-0 focus-visible:ring-accent-8"
              variant="ghost"
              size="text"
            >
              <PersonIcon className="h-4 w-4 shrink-0" />
            </Button>
          </UserAccountNav>
        ) : (
          <LoginDialog>
            <Button
              className="h-6 w-6 p-0 focus-visible:ring-accent-8"
              variant="ghost"
              size="text"
            >
              <PersonIcon className="h-4 w-4 shrink-0" />
            </Button>
          </LoginDialog>
        )}
      </div>
    </header>
  );
}
