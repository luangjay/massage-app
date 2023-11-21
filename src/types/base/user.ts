import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  tel: z.string(),
  role: z.union([z.literal("admin"), z.literal("user")]),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
