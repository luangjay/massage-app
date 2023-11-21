import { z } from "zod";

export const shopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  priceLevel: z.number(),
  address: z.string(),
  province: z.string(),
  postalcode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

export type Shop = z.infer<typeof shopSchema>;
