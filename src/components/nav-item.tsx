import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type NavItemProps = {
  variant?: "default" | "home";
  href: string;
  title: string;
};

export function NavItem({ variant = "default", href, title }: NavItemProps) {
  return (
    <Button
      className={cn(
        variant === "home"
          ? "text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
          : "text-gray-12 hover:decoration-accent-6"
      )}
      variant="link"
      size="text"
      asChild
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}
