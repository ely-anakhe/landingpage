import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { Preloader } from "@/components/ui/Preloader";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const cedarville = Cedarville_Cursive({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: "400",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Anakhe by Jordan Anais",
  description: "Bespoke interior design studio and furniture atelier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${lato.variable} ${cedarville.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <DesktopNav />
        <MobileHeader />

        <main className="flex-grow pt-24 md:pt-0 w-full min-h-screen flex flex-col relative">
          {children}
          <Footer /> {/* Kept footer here for now, might need adjustment based on sidebar layout pref */}
        </main>

        <InquiryModal />
        <Preloader />
      </body>
    </html>
  );
}
