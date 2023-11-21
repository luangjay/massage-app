import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  tel: z.string(),
  role: z.string(),
  password: z.string(),
  createAt: z.string(),
});

export type User = z.infer<typeof userSchema>;
