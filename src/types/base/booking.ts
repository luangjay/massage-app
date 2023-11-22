import { z } from "zod";
import { shopSchema } from "./shop";
import { userSchema } from "./user";

export const bookingSchema = z.object({
  _id: z.string(),
  bookingDate: z.string(),
  serviceMinute: z.number(),
  user: userSchema,
  shop: shopSchema,
});

export type Booking = z.infer<typeof bookingSchema>;
