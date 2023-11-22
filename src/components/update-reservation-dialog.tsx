"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type Booking } from "@/types/base/booking";
import { deleteBooking } from "@/actions/delete-booking";
import { updateBooking } from "@/actions/update-booking";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { toast } from "./ui/toaster";

const formDataSchema = z.object({
  bookingDate: z.date(),
  serviceMinute: z.string(),
});

type FormData = z.infer<typeof formDataSchema>;

type UpdateReservationDialogProps = {
  reservation: Booking;
  role: "admin" | "user";
  children?: React.ReactNode;
};

export function UpdateReservationDialog({
  reservation,
  role = "user",
  children,
}: UpdateReservationDialogProps) {
  const router = useRouter();

  const { shop, user } = reservation;
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      bookingDate: new Date(reservation.bookingDate),
      serviceMinute: reservation.serviceMinute.toString(),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: FormData) => {
    const response = await updateBooking(reservation._id, {
      bookingDate: format(data.bookingDate, "yyyy-MM-dd"),
      serviceMinute: parseInt(data.serviceMinute),
    });

    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to update the reservation.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "The reservation has been update.",
      });
      router.refresh();
      setOpen(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleting(true);
    const response = await deleteBooking(reservation._id);
    if (!response.success) {
      toast({
        title: "Error",
        description: "Failed to delete reservation.",
        variant: "danger",
      });
    } else {
      toast({
        title: "Success",
        description: "The reservation has been deleted.",
      });
      router.refresh();
      setOpen(false);
    }
    setDeleting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <Form {...form}>
          <form
            className="grid gap-6"
            onSubmit={(...a) => void handleSubmit(onSubmit)(...a)}
          >
            <DialogHeader>
              <DialogTitle>Edit reservation</DialogTitle>
              <DialogDescription>
                Update {role === "admin" ? `${user.name}'s` : "your"} massage
                reservation at {shop.name}
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="bookingDate"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reservation date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="ghost"
                          className="w-full bg-surface text-left font-normal ring-1 ring-gray-a7 transition-none hover:bg-surface enabled:hover:ring-gray-a8"
                        >
                          {format(field.value, "PPP")}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < yesterday}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              name="serviceMinute"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1 flex-col">
                  <FormLabel htmlFor={`service-${shop._id}`}>
                    Service minutes
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id={`service-${shop._id}`}
                        className="w-full"
                      >
                        {field.value} minutes
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                        <SelectItem value="120">120 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="sm:flex-row-reverse sm:justify-between">
              <Button type="submit" disabled={isSubmitting || deleting}>
                Update
              </Button>
              <Button
                variant="danger"
                type="button"
                disabled={deleting}
                onClick={(...a) => void handleDelete(...a)}
              >
                Delete
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
