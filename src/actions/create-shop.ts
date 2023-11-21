"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import {
  createShopResponseSchema,
  type createShopSchema,
} from "@/types/shop-api";

export async function createShop(
  body: z.infer<typeof createShopSchema>
): Promise<z.infer<typeof createShopResponseSchema>> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/shops`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  });

  return parseType(createShopResponseSchema, await response.json());
}
