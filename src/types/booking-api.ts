import { z } from "zod";
import { bookingSchema } from "./base/booking";

/**
 * GET /bookings
 */
export const getBookingsResponseSchema = z.object({
  success: z.boolean(),
  count: z.number(),
  data: z.array(bookingSchema).optional(),
});

/**
 * POST /shops/{shopId}/bookings
 */
export const createBookingSchema = z.object({
  bookingDate: z.string(),
  serviceMinute: z.number(),
});

export const createBookingResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      bookingDate: z.string(),
      serviceMinute: z.number(),
      user: z.string(),
      shop: z.string(),
      _id: z.string(),
    })
    .optional(),
});

/**
 * GET /bookings/{id}
 */
export const getBookingResponseSchema = z.object({
  success: z.boolean(),
  data: bookingSchema.optional(),
});

/**
 * PUT /bookings/{id}
 */
export const updateBookingSchema = z.object({
  bookingDate: z.string(),
  serviceMinute: z.number(),
});

export const updateBookingResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      _id: z.string(),
      bookingDate: z.string(),
      serviceMinute: z.number(),
      user: z.string(),
      shop: z.string(),
    })
    .optional(),
});

/**
 * DELETE /bookings/{id}
 */
export const deleteBookingResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({}),
});
