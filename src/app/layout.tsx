import { type Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { ThemeProvider } from "../components/theme-provider";

const fontSans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["vietnamese"],
});

const fontMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["vietnamese"],
});

const fontBrand = localFont({
  variable: "--font-brand",
  src: "../../public/fonts/HandleChangeDemoRegular.woff2",
  preload: true,
});

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Create Next App",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-gray-12 antialiased selection:bg-accent-a5",
          fontSans.variable,
          fontMono.variable,
          fontBrand.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
