import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { NewsletterForm } from "./NewsletterForm";

export const Footer = async () => {
    const settings = await client.fetch(SETTINGS_QUERY);

    return (
        <footer className="w-full bg-background border-t border-border pt-8 pb-6 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
                {/* Col 1: Logo Section (Spans 4 columns) */}
                <div className="md:col-span-4 flex flex-col">
                    <Link href="/" className="group flex flex-col w-fit">
                        <span className="font-serif text-4xl md:text-5xl tracking-widest text-text-main uppercase group-hover:text-primary transition-colors duration-500">
                            ANAKHE
                        </span>
                        <span className="block text-xs md:text-sm tracking-[0.3em] font-serif text-muted uppercase mt-2 group-hover:text-primary/70 transition-colors duration-500">
                            by Jordan Anais
                        </span>
                    </Link>

                    {/* Contact Info from Sanity */}
                    {settings?.footerContact && (
                        <div className="mt-8 font-serif text-sm text-muted leading-relaxed max-w-xs">
                            <PortableText value={settings.footerContact} />
                        </div>
                    )}

                    {/* Social Links from Sanity */}
                    {settings?.socialLinks && settings.socialLinks.length > 0 && (
                        <div className="mt-8 flex gap-4">
                            {settings.socialLinks.map((link: any, i: number) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-serif uppercase tracking-widest text-muted hover:text-primary transition-colors"
                                >
                                    {link.platform}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Col 2: Links 1 (Spans 2 columns) */}
                <div className="md:col-span-2 flex flex-col justify-end">
                    <Link
                        href="/interiors"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Interiors
                    </Link>
                    <Link
                        href="/atelier"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Atelier
                    </Link>
                    <Link
                        href="/materials"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Materials
                    </Link>
                    <Link
                        href="/about"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        About
                    </Link>
                </div>

                {/* Col 3: Links 2 (Spans 2 columns) */}
                <div className="md:col-span-2 flex flex-col justify-end">
                    <Link
                        href="/press"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Press
                    </Link>
                    <Link
                        href="/contact"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/common-questions"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        FAQ
                    </Link>
                    <a
                        href="https://jordananais.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        JORDAN ANAIS
                    </a>
                </div>

                {/* Col 4: Newsletter (Spans 4 columns) */}
                <div className="md:col-span-4 flex flex-col justify-end">
                    <span className="font-handwriting text-4xl text-text-main/60 -rotate-2 mb-6 block">
                        Newsletter
                    </span>
                    <NewsletterForm />
                </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-serif tracking-widest text-gray-400 uppercase">
                <span>&copy; {new Date().getFullYear()} Anakhe Ltd. All Rights Reserved. • Company No. 15737599 • VAT No. 0000000</span>
                <div className="flex gap-x-8 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-text-main transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-text-main transition-colors">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
};
