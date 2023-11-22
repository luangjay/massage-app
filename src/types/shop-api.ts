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
  postalcode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

export const createShopResponseSchema = z.object({
  success: z.boolean(),
  data: z
    .object({
      _id: z.string(),
      name: z.string(),
      address: z.string(),
      priceLevel: z.number(),
      province: z.string(),
      postalcode: z.string(),
      tel: z.string(),
      picture: z.string(),
    })
    .optional(),
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
export const getShopResponseSchema = z.object({
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
  postalcode: z.string(),
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
export const deleteShopResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({}),
});
