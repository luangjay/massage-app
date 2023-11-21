import * as React from "react";
import { cn } from "@/lib/utils";
import { LoginDialog } from "./login-dialog";

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "container sticky left-0 right-0 top-0 z-50 flex h-32 items-center justify-end",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-center">Logo</div>
      <div className="absolute bottom-0 right-8 top-0 flex items-center justify-center gap-4">
        <LoginDialog />
      </div>
    </header>
  );
}
