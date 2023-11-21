import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type HeaderLinkProps = {
  variant?: "default" | "home";
  href: string;
  title: string;
};

export function HeaderLink({
  variant = "default",
  href,
  title,
}: HeaderLinkProps) {
  return (
    <Button
      className={cn(
        variant === "home"
          ? "text-accent-contrast hover:decoration-accent-contrast focus-visible:ring-accent-8"
          : "text-gray-12"
      )}
      variant="link"
      size="text"
      asChild
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
}
