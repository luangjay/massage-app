"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { parseType } from "@/lib/utils";
import { loginResponseSchema, type loginSchema } from "@/types/user-api";

export async function login(
  body: z.infer<typeof loginSchema>
): Promise<z.infer<typeof loginResponseSchema>> {
  const response = await fetch(`${env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log("login calledddd");

  const data = (await response.json()) as Record<string, unknown>;
  return parseType(loginResponseSchema, { ...data });
}
