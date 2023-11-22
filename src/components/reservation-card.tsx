import Image from "next/image";
import { format } from "date-fns";
import { type Session } from "next-auth";
import { type Booking } from "@/types/base/booking";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

type ReservationCardProps = {
  reservation: Booking;
  session: Session | null;
};

export function ReservationCard({
  reservation,
  session,
}: ReservationCardProps) {
  const { user, shop } = reservation;

  return (
    <button className="rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:text-gray-a8">
      <Card className="flex h-40 shadow-sm hover:shadow-lg hover:ring-gray-a7">
        <div className="relative m-6 aspect-square">
          <Image
            className="aspect-square rounded-md"
            style={{ objectFit: "cover" }}
            src={shop.picture}
            alt="Massage Shop"
            fill
          />
        </div>
        <div className="flex w-full items-center pr-9">
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex flex-1 items-center gap-2">
              <h3 className="truncate text-lg font-semibold">{shop.name}</h3>
              <span className="shrink-0 text-xl font-medium tracking-tighter text-accent-a11">
                {Array.from({ length: shop.priceLevel }, () => "$")}
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 text-sm text-gray-a11">
              <p>{shop.address}</p>
              <p>
                {shop.province}, {shop.postalcode}
              </p>
              <p>{shop.tel}</p>
            </div>
          </div>
          <div className="flex justify-start">
            <Separator
              className="h-auto w-[0.1875rem] bg-accent-a7"
              orientation="vertical"
            />
            <div className="flex flex-col items-start gap-2 px-5 text-sm text-accent-a11">
              {session?.user.role === "admin" && (
                <p className="font-semibold">{user.name}</p>
              )}
              <p>{format(new Date(reservation.bookingDate), "MMM dd yyyy")}</p>
              <p>{reservation.serviceMinute} minutes</p>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}
