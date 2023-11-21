"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import { getBookingsResponseSchema } from "@/types/booking-api";

export async function getBookings(): Promise<
  z.infer<typeof getBookingsResponseSchema>
> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/bookings`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    cache: "no-cache",
  });
  return parseType(getBookingsResponseSchema, await response.json());
}
