import { z } from "zod";
import { userSchema } from "./base/user";

/**
 * POST /auth/login
 */
export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  success: z.boolean(),
  _id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  token: z.string().optional(),
});

/**
 * GET /auth/me
 */
export const getMeResponseSchema = z.object({
  success: z.boolean(),
  data: userSchema.optional(),
});

/**
 * POST /auth/register
 */
export const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  tel: z.string(),
  role: z.string(),
  password: z.string(),
});

export const registerResponseSchema = z.object({
  success: z.boolean(),
  _id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  token: z.string().optional(),
});
