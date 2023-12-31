"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import {
  createBookingResponseSchema,
  type createBookingSchema,
} from "@/types/booking-api";

export async function createBooking(
  shopId: string,
  body: z.infer<typeof createBookingSchema>
): Promise<z.infer<typeof createBookingResponseSchema>> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/shops/${shopId}/bookings`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
  });
  return parseType(createBookingResponseSchema, await response.json());
}
