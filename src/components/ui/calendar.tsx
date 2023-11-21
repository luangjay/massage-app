"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 sm:gap-4 sm:gap-0",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "gap-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "ghost" }), "h-7 w-7 p-0"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full",
        head_row: "flex",
        head_cell: "text-gray-a11 rounded w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent-9 first:[&:has([aria-selected])]:rounded-l last:[&:has([aria-selected])]:rounded-r",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r [&:has(>.day-range-start)]:rounded-l first:[&:has([aria-selected])]:rounded-l last:[&:has([aria-selected])]:rounded-r"
            : "[&:has([aria-selected])]:rounded"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal"
        ),
        day_selected:
          "bg-accent-9 text-accent-contrast hover:bg-accent-9 hover:text-accent-contrast focus:bg-accent-9 focus:text-accent-contrast",
        day_today: "bg-gray-a3",
        day_outside: "text-gray-a8",
        day_disabled: "text-gray-a8 hover:bg-transparent",
        day_range_middle:
          "aria-selected:bg-gray-a2 aria-selected:text-accent-a11",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};
Calendar.displayName = "Calendar";

export { Calendar, type CalendarProps };
