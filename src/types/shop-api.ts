import { z } from "zod";
import { shopSchema } from "./base/shop";

/**
 * POST /shops
 */
export const createShopSchema = z.object({
  name: z.string(),
  address: z.string(),
  priceLevel: z.number(),
  province: z.string(),
  postalCode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

export const createShopResponseSchema = z.object({
  name: z.string(),
  address: z.string(),
  priceLevel: z.number(),
  province: z.string(),
  postalCode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

/**
 * GET /shops
 */
export const getShopsResponseSchema = z.object({
  success: z.boolean(),
  count: z.number(),
  data: z.array(shopSchema).optional(),
});

/**
 * GET /shops/{id}
 */
export const getShopByIdResponseSchema = z.object({
  success: z.boolean(),
  data: shopSchema,
});

/**
 * PUT /shops/{id}
 */
export const updateShopSchema = z.object({
  name: z.string(),
  address: z.string(),
  priceLevel: z.number(),
  province: z.string(),
  postalCode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

export const updateShopResponseSchema = z.object({
  success: z.boolean(),
  data: shopSchema,
});

/**
 * DELETE /shops/{id}
 */
export const deleteShopByIdResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({}),
});
