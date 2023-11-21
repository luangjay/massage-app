"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import {
  updateShopResponseSchema,
  type updateShopSchema,
} from "@/types/shop-api";

export async function updateShop(
  id: string,
  body: z.infer<typeof updateShopSchema>
): Promise<z.infer<typeof updateShopResponseSchema>> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/shops/${id}`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    method: "PUT",
    body: JSON.stringify({
      ...body,
    }),
  });
  return parseType(updateShopResponseSchema, await response.json());
}
