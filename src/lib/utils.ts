import { cx } from "cva";
import { type ClassValue } from "cva/types";
import { twMerge } from "tailwind-merge";
import { type z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs));
}

export async function sleep(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function parseType<T>(schema: z.ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}
