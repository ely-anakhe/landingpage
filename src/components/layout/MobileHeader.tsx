"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";

interface MobileHeaderProps {
    navItems?: { label: string; href: string }[];
}

export function MobileHeader({ navItems = [] }: MobileHeaderProps) {
    const defaultItems = [
        { label: "Interiors", href: "/interiors" },
        { label: "Atelier", href: "/atelier" },
        { label: "Journal", href: "/journal" },
    ];

    const items = navItems?.length > 0 ? navItems : defaultItems;

    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-background/90 backdrop-blur-sm border-b border-border">
                <Link href="/" onClick={closeMenu} className="z-50 relative">
                    <h1 className="font-serif text-xl tracking-[0.2em] uppercase text-text-main">
                        Anakhe
                    </h1>
                </Link>

                <button
                    onClick={toggleMenu}
                    className="z-50 relative p-2 -mr-2 text-text-main focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        <nav className="flex flex-col items-center space-y-8">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                        "text-3xl font-serif tracking-widest uppercase transition-colors duration-300",
                                        pathname === item.href
                                            ? "text-primary italic"
                                            : "text-text-main hover:text-primary"
                                    )}
                                >
                                    <motion.span
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            ))}

                            <div onClick={closeMenu}>
                                <OpenInquiryButton
                                    className="text-3xl font-serif tracking-widest uppercase text-text-main hover:text-primary bg-transparent text-center h-auto p-0"
                                    variant="ghost"
                                    label="Contact"
                                />
                            </div>
                        </nav>

                        <div className="absolute bottom-12 flex flex-col items-center space-y-4">
                            <p className="text-[0.6rem] tracking-[0.3em] uppercase opacity-50">
                                Est. 2024
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
