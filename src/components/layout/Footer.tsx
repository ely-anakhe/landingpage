import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";

export const Footer = async () => {
    const settings = await client.fetch(SETTINGS_QUERY);

    return (
        <footer className="w-full bg-background border-t border-border py-24 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
                {/* Col 1: Logo Section (Spans 4 columns) */}
                <div className="md:col-span-4 flex flex-col">
                    <Link href="/" className="font-serif text-4xl md:text-5xl tracking-widest text-text-main uppercase">
                        {settings?.siteTitle || "ANAKHE"}
                    </Link>
                    <span className="font-sans text-xs tracking-[0.3em] mt-2 uppercase text-gray-500">
                        INTERIOR ATELIER
                    </span>

                    {/* Contact Info from Sanity */}
                    {settings?.footerContact && (
                        <div className="mt-8 font-sans text-sm text-muted leading-relaxed max-w-xs">
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
                <div className="md:col-span-2 flex flex-col">
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
                        href="/about"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Contact
                    </Link>
                </div>

                {/* Col 3: Links 2 (Spans 2 columns) */}
                <div className="md:col-span-2 flex flex-col">
                    <Link
                        href="/press"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Press
                    </Link>
                    <Link
                        href="/journal"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Journal
                    </Link>
                    <Link
                        href="/shipping"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Shipping
                    </Link>
                    <Link
                        href="/legal"
                        className="font-serif text-sm uppercase tracking-widest text-text-main hover:text-primary transition-colors block mb-4"
                    >
                        Legal
                    </Link>
                </div>

                {/* Col 4: Newsletter (Spans 4 columns) */}
                <div className="md:col-span-4 flex flex-col">
                    <span className="font-handwriting text-4xl text-text-main -rotate-2 mb-6 block">
                        Subscribe
                    </span>
                    <form className="w-full">
                        <input
                            type="email"
                            placeholder="Email Functionality Coming Soon"
                            className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-primary font-serif placeholder:italic"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-black text-white font-serif uppercase tracking-widest py-3 text-xs hover:bg-primary transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-serif tracking-widest text-gray-400 uppercase">
                <span>&copy; {new Date().getFullYear()} {settings?.siteTitle || "Anakhe"}. All rights reserved.</span>
                <div className="flex gap-x-8 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-text-main transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-text-main transition-colors">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
};
