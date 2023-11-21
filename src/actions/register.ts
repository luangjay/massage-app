"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { parseType } from "@/lib/utils";
import { registerResponseSchema, type registerSchema } from "@/types/user-api";

export async function register(
  body: z.infer<typeof registerSchema>
): Promise<z.infer<typeof registerResponseSchema>> {
  const response = await fetch(`${env.API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  });
  return parseType(registerResponseSchema, await response.json());
}
