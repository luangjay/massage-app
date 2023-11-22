"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { type User } from "@/types/base/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserNavMenuProps = {
  user: User;
  children: React.ReactNode;
};

export function UserAccountNav({ user, children }: UserNavMenuProps) {
  const router = useRouter();

  const logout = async () => {
    await signOut({});
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-3">
          <div className="flex w-[12rem] flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-full truncate text-sm text-gray-a11">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/shops">Search shops</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/reservations">My reservations</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            void logout();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
