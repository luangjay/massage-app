import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header className="relative bg-gradient-to-b from-black/[0.8] to-black/[0.02] text-accent-contrast" />
      {children}
      <Footer />
    </div>
  );
}
