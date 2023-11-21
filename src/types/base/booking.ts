import { z } from "zod";

export const bookingSchema = z.object({
  _id: z.string(),
  bookingDate: z.string(),
  serviceMinute: z.number(),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    tel: z.string(),
  }),
  shop: z.object({
    _id: z.string(),
    name: z.string(),
    address: z.string(),
    tel: z.string(),
  }),
});

export type Booking = z.infer<typeof bookingSchema>;
