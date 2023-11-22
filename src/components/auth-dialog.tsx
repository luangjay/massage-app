"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";

type AuthDialogProps = {
  children?: React.ReactNode;
};

export function AuthDialog({ children }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<"login" | "signUp">("login");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {option === "login" ? (
        <LoginForm setOpen={setOpen} setOption={setOption} />
      ) : (
        <SignUpForm setOpen={setOpen} setOption={setOption} />
      )}
    </Dialog>
  );
}
