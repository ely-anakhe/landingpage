import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Footer } from "@/components/layout/Footer";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { Preloader } from "@/components/ui/Preloader";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SETTINGS_QUERY);
  return {
    title: settings?.seo?.title || "Anakhe by Jordan Anais",
    description: settings?.seo?.description || "Bespoke interior design studio and furniture atelier.",
  };
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(SETTINGS_QUERY);
  // const settings = null;

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${lato.variable} ${cedarville.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <AnnouncementBar data={settings?.announcementBar} />
        <DesktopNav navItems={settings?.mainNavigation} />
        <MobileHeader navItems={settings?.mainNavigation} />

        <main className="flex-grow pt-24 md:pt-0 w-full min-h-screen flex flex-col relative">
          {children}
          <Footer settings={settings} />
        </main>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Anakhe Ltd by Jordan Anais",
              description: "Interior design studio",
              address: {
                "@type": "PostalAddress",
                addressLocality: "London",
                addressCountry: "UK",
              },
              sameAs: settings?.socialLinks?.map((link: any) => link.url) || [],
            }),
          }}
        />

        <InquiryModal />
        <Preloader />
      </body>
    </html>
  );
}
