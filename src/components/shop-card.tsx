"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { type Shop } from "@/types/base/shop";
import { createBooking } from "@/actions/create-booking";
import { deleteShop } from "@/actions/delete-shop";
import { ShopDialog } from "./shop-dialog";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "./ui/toaster";

type ShopCardProps = {
  shop: Shop;
  role?: "admin" | "user";
};

const formDataSchema = z.object({
  bookingDate: z.date(),
  serviceMinute: z.union([z.literal("60"), z.literal("90"), z.literal("120")]),
});

type FormData = z.infer<typeof formDataSchema>;

export function ShopCard({ shop, role }: ShopCardProps) {
  const router = useRouter();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDialogOpen, setShopDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      bookingDate: new Date(),
      serviceMinute: "60",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: FormData) => {
    const response = await createBooking(shop._id, {
      bookingDate: format(data.bookingDate, "yyyy-MM-dd"),
      serviceMinute: parseInt(data.serviceMinute),
    });

    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to create the reservation.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "The reservation has been created.",
      });
      router.refresh();
    }
  };

  const handleDelete = async (e: Event) => {
    e.preventDefault();
    setDeleting(true);
    const response = await deleteShop(shop._id);
    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to delete shop.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "The shop has been deleted.",
      });
      router.refresh();
      setMenuOpen(false);
    }
    setDeleting(false);
  };

  return (
    <Card className="flex flex-col gap-3 p-4">
      <div className="relative aspect-[4/3] w-full">
        <Image
          className="rounded"
          style={{ objectFit: "cover" }}
          src={shop.picture}
          alt="Massage Shop"
          fill
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <div
            className={cn(
              "flex w-full items-center gap-2",
              role === "admin" && "max-w-[18rem]"
            )}
          >
            <h3 className="truncate text-lg font-bold">{shop.name}</h3>
            <span className="shrink-0 text-xl font-medium tracking-tighter text-accent-a11">
              {Array.from({ length: shop.priceLevel }, () => "$")}
            </span>
          </div>
          {role === "admin" && (
            <DropdownMenu
              modal={false}
              open={menuOpen}
              onOpenChange={setMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button className="h-6 w-6 p-0" variant="ghost">
                  <DotsVerticalIcon className="h-4 w-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => void setShopDialogOpen(true)}
                    disabled={deleting}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-danger-9"
                    onSelect={(...a) => void handleDelete(...a)}
                    disabled={deleting}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          )}
        </div>
        <div className="flex flex-col items-start text-gray-a11">
          <p>{shop.address}</p>
          <p>
            {shop.province}, {shop.postalcode}
          </p>
          <p>{shop.tel}</p>
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={(...a) => void handleSubmit(onSubmit)(...a)}
          className="flex items-end gap-2"
        >
          <FormField
            name="bookingDate"
            control={control}
            render={({ field }) => (
              <FormItem className="flex-[1.5] flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="ghost"
                        className="w-full bg-surface text-left font-normal ring-1 ring-gray-a7 transition-none hover:bg-surface enabled:hover:ring-gray-a8"
                      >
                        {format(field.value, "MMM dd, yyyy")}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverPortal>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < yesterday}
                        initialFocus
                      />
                    </PopoverContent>
                  </PopoverPortal>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            name="serviceMinute"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 flex-col">
                <FormLabel htmlFor={`service-${shop._id}`}>Service</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={`service-${shop._id}`}
                      className="w-full"
                    >
                      {field.value} mins
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 mins</SelectItem>
                      <SelectItem value="90">90 mins</SelectItem>
                      <SelectItem value="120">120 mins</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!role || isSubmitting}>
            Reserve
          </Button>
        </form>
      </Form>
      {role === "admin" && (
        <ShopDialog
          open={shopDialogOpen}
          onOpenChange={setShopDialogOpen}
          shop={shop}
        />
      )}
    </Card>
  );
}
