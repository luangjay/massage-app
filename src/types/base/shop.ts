import { z } from "zod";

export const shopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  pricelevel: z.number(),
  province: z.string(),
  postalcode: z.string(),
  tel: z.string(),
  picture: z.string(),
});

export type Shop = z.infer<typeof shopSchema>;
