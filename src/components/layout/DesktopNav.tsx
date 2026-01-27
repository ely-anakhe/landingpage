"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";

interface DesktopNavProps {
    navItems?: { label: string; href: string }[];
}

export function DesktopNav({ navItems = [] }: DesktopNavProps) {
    // Default items if none provided
    const defaultItems = [
        { label: "Interiors", href: "/interiors" },
        { label: "Atelier", href: "/atelier" },
        { label: "Materials", href: "/materials" },
        { label: "Journal", href: "/journal" },
    ];

    const items = navItems?.length > 0 ? navItems : defaultItems;
    const pathname = usePathname();

    return (
        <header className="hidden md:flex w-full sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border items-center justify-between px-8 py-2 transition-all duration-300">
            {/* Logo */}
            <Link href="/" className="group flex flex-col">
                <h1 className="font-serif text-2xl tracking-[0.2em] uppercase text-text-main group-hover:text-primary transition-colors duration-500">
                    Anakhe
                </h1>
                <span className="block text-[0.6rem] tracking-[0.3em] font-serif text-muted uppercase mt-0.5 group-hover:text-primary/70 transition-colors duration-500">
                    by Jordan Anais
                </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:text-primary hover:scale-110 font-serif",
                                isActive
                                    ? "font-bold text-primary"
                                    : "text-muted"
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                <OpenInquiryButton
                    className="text-xs uppercase tracking-[0.15em] font-serif text-muted hover:text-primary hover:scale-110 transition-all duration-300 bg-transparent hover:bg-transparent border-none p-0 h-auto"
                    variant="ghost"
                    label="Contact"
                />
            </nav>
        </header>
    );
}
