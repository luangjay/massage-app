import Link from "next/link";
import {
  ArrowRightIcon,
  BookmarkIcon,
  EyeClosedIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { getServerSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/login-dialog";
import { ServiceCard } from "@/components/service-card";

export default async function Page() {
  const session = await getServerSession();

  return (
    <main className="flex flex-col">
      <section className="flex min-h-[32rem] flex-1 flex-col items-center text-accent-contrast">
        <h1 className="mt-32 text-6xl font-bold leading-none tracking-tight drop-shadow-lg">
          Flower & Candle
        </h1>
        <p className="mt-3 text-2xl tracking-tight drop-shadow-lg">
          Massage Reservation App
        </p>
        {session ? (
          <Button
            className="mt-8 focus-visible:ring-accent-8"
            size="lg"
            asChild
          >
            <Link href="/shops">
              Get started
              <ArrowRightIcon className="shrink-0" />
            </Link>
          </Button>
        ) : (
          <LoginDialog>
            <Button className="mt-8 focus-visible:ring-accent-8" size="lg">
              Get started
              <ArrowRightIcon className="shrink-0" />
            </Button>
          </LoginDialog>
        )}
      </section>
      <section
        id="services"
        className="flex flex-col items-center gap-8 px-8 pt-16"
      >
        <h2 className="text-3xl font-semibold leading-none tracking-tight">
          Services in your mind
        </h2>
        <div className="grid w-full max-w-5xl auto-cols-fr grid-cols-4 gap-8">
          <ServiceCard
            Icon={PersonIcon}
            title="Register"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <ServiceCard
            Icon={MagnifyingGlassIcon}
            title="Research"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <ServiceCard
            Icon={BookmarkIcon}
            title="Reserve"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <ServiceCard
            Icon={EyeClosedIcon}
            title="Relax"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
        </div>
      </section>
    </main>
  );
}
