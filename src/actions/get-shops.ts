"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { parseType } from "@/lib/utils";
import { getShopsResponseSchema } from "@/types/shop-api";

export async function getShops(): Promise<
  z.infer<typeof getShopsResponseSchema>
> {
  const response = await fetch(`${env.API_URL}/shops`, { cache: "no-cache" });
  return parseType(getShopsResponseSchema, await response.json());
}
