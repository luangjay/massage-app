"use server";

import { env } from "env.mjs";
import { type z } from "zod";
import { getServerSession } from "@/lib/auth";
import { parseType } from "@/lib/utils";
import {
  updateBookingResponseSchema,
  type updateBookingSchema,
} from "@/types/booking-api";

export async function updateBooking(
  id: string,
  body: z.infer<typeof updateBookingSchema>
): Promise<z.infer<typeof updateBookingResponseSchema>> {
  const session = await getServerSession();
  if (!session) throw new Error("No Session");
  const response = await fetch(`${env.API_URL}/bookings/${id}`, {
    headers: {
      "Content-Type": "application/json", // for post, put, patch
      Authorization: `Bearer ${session.token}`, // for those which require auth
    },
    method: "PUT",
    body: JSON.stringify({
      ...body,
    }),
  });
  return parseType(updateBookingResponseSchema, await response.json());
}
