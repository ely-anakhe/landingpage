import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google"; // Changed fonts
import "./globals.css";
import { SanctuaryHeader } from "@/components/layout/SanctuaryHeader";
import { SanctuaryFooter } from "@/components/layout/SanctuaryFooter";
import { InquiryModal } from "@/components/ui/InquiryModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
        className={`${cormorant.variable} ${lato.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <SanctuaryHeader />
        <main className="flex-grow pt-24">{children}</main>
        <SanctuaryFooter />
        <InquiryModal />
      </body>
    </html>
  );
}
