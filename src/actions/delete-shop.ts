"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import { deleteShopResponseSchema } from "@/types/shop-api";

export async function deleteShop(
  id: string
): Promise<z.infer<typeof deleteShopResponseSchema>> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/shops/${id}`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    method: "DELETE",
  });
  return parseType(deleteShopResponseSchema, await response.json());
}
