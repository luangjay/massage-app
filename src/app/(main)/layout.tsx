import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
      <div className="absolute left-0 right-0 -z-10 h-32">
        <div className="absolute inset-0 bg-accent-3"></div>
      </div>
    </div>
  );
}
