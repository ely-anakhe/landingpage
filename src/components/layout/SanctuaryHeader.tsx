"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";

const navItems = [
    { label: "Collections", href: "/collections" },
    { label: "Stories", href: "/stories" },
    { label: "Philosophy", href: "/philosophy" },
];

export function SanctuaryHeader() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-in-out px-6 py-6 border-b border-transparent",
                scrolled ? "bg-background/90 backdrop-blur-md border-muted/10 py-4" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="group">
                    <h1 className="font-serif text-2xl tracking-widest uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                        Anakhe
                        <span className="block text-[0.6rem] tracking-[0.3em] font-sans opacity-70 group-hover:opacity-100 transition-opacity">
                            by Jordan Anais
                        </span>
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center gap-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm uppercase tracking-widest font-sans text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <OpenInquiryButton />
            </div>
        </motion.header>
    );
}
