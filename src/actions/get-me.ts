"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { parseType } from "@/lib/utils";
import { getMeResponseSchema } from "@/types/user-api";

export async function getMe(
  token: string
): Promise<z.infer<typeof getMeResponseSchema>> {
  const response = await fetch(`${env.API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseType(getMeResponseSchema, await response.json());
}
