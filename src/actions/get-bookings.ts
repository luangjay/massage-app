"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { parseType } from "@/lib/utils";
import { getBookingsResponseSchema } from "@/types/booking-api";

export async function getBookings(): Promise<
  z.infer<typeof getBookingsResponseSchema>
> {
  const response = await fetch(`${env.API_URL}/bookings`);
  return parseType(getBookingsResponseSchema, await response.json());
}
