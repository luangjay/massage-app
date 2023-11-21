"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Shop } from "@/types/base/shop";
import { createShop } from "@/actions/create-shop";
import { updateShop } from "@/actions/update-shop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { toast } from "./ui/toaster";

const formDataSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  address: z.string().trim().min(1, { message: "Required" }),
  priceLevel: z.string(),
  province: z.string().trim().min(1, { message: "Required" }),
  postalcode: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(/\b\d{5}\b/g, {
      message: "Must be 5-digit numbers",
    }),
  tel: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .regex(/\b\d{10}\b/g, {
      message: "Must be 10-digit numbers",
    }),
  picture: z.string().trim().min(1, { message: "Required" }),
});

type FormData = z.infer<typeof formDataSchema>;

type CreateShopDialogProps = {
  shop?: Shop;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export function ShopDialog({
  shop,
  open,
  onOpenChange,
  children,
}: CreateShopDialogProps) {
  const router = useRouter();
  const [_open, _setOpen] = useState<boolean | undefined>(open ?? false);

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: shop?.name ?? "",
      address: shop?.address ?? "",
      priceLevel: shop?.priceLevel.toString() ?? "3",
      province: shop?.province ?? "",
      postalcode: shop?.postalcode ?? "",
      tel: shop?.tel ?? "",
      picture: shop?.picture ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: FormData) => {
    if (shop) {
      const response = await updateShop(shop._id, {
        ...data,
        priceLevel: parseInt(data.priceLevel),
      });

      if (!response.success) {
        toast({
          title: "Error",
          description: "Failed to update shop.",
          variant: "danger",
        });
      } else {
        toast({
          title: "Success",
          description: "The shop has been updated.",
        });
        router.refresh();
        _setOpen(false);
        onOpenChange?.(false);
      }
    } else {
      const response = await createShop({
        ...data,
        priceLevel: parseInt(data.priceLevel),
      });

      if (!response.success) {
        toast({
          title: "Error",
          description: "Failed to create shop.",
          variant: "danger",
        });
      } else {
        toast({
          title: "Success",
          description: "The shop has been created.",
        });
        router.refresh();
        _setOpen(false);
        onOpenChange?.(false);
      }
    }
  };

  useEffect(() => {
    if (open !== undefined && open !== _open) {
      _setOpen(open);
      onOpenChange?.(open);
    }
  }, [_open, open, onOpenChange]);

  return (
    <Dialog
      open={_open}
      onOpenChange={(open) => {
        _setOpen(open);
        onOpenChange?.(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <Form {...form}>
          <form
            className="grid gap-6"
            onSubmit={(...a) => void handleSubmit(onSubmit)(...a)}
          >
            <DialogHeader>
              <DialogTitle>{shop ? "Update shop" : "Create shop"}</DialogTitle>
              <DialogDescription>
                {shop
                  ? "Create a new massage shop."
                  : "Edit massage shop information."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4">
              <FormField
                name="name"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chula Massage" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tel"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tel</FormLabel>
                    <FormControl>
                      <Input placeholder="099xxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                name="address"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="42 Ratchadapisek" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                name="province"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Huai Khwang" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="postalcode"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal code</FormLabel>
                    <FormControl className="flex-1">
                      <Input placeholder="90110" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                name="picture"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-[3]">
                    <FormLabel>Picture URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://localhost:3000/panda.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="priceLevel"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="priceLevel">Price level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="priceLevel" className="w-full">
                          {field.value}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
