import { getServerSession } from "@/lib/auth";
import { getBookings } from "@/actions/get-bookings";
import { ReservationCard } from "@/components/reservation-card";
import { UpdateReservationDialog } from "@/components/update-reservation-dialog";

export default async function Page() {
  const session = await getServerSession();
  const reservations = session
    ? await getBookings().then(({ data }) => data ?? [])
    : [];

  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-8 pt-16">
        <h1 className="text-2xl font-bold tracking-tight">
          {session?.user.role === "admin"
            ? "All reservations"
            : "My reservations"}
        </h1>
        {reservations.length === 0 ? (
          <p className="text-gray-a11">
            You currently do not have massage reservations.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {reservations.map((reservation) => (
              <UpdateReservationDialog
                key={reservation._id}
                reservation={reservation}
                role={session?.user.role}
              >
                <ReservationCard reservation={reservation} session={session} />
              </UpdateReservationDialog>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
