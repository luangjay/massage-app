import Image from "next/image";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header variant="home" />
      {children}
      <Footer />
      <div className="absolute left-0 right-0 -z-10">
        <Image
          className="relative h-[40rem] w-full select-none bg-gray-a11"
          style={{ objectFit: "cover" }}
          src="/images/hero.jpg"
          alt="Hero"
          width={1920}
          height={1280}
          priority
        />
        <div className="absolute inset-0 dark:bg-black/40"></div>
        <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-black/[0.8] to-black/[0.02] text-accent-contrast"></div>
      </div>
    </div>
  );
}
