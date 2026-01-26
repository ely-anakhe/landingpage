"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpecAccordionProps {
    title: string;
    items?: string[];
    content?: string;
}

export function SpecAccordion({ title, items, content }: SpecAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between group"
                aria-expanded={isOpen}
            >
                <span className="font-sans text-xs uppercase tracking-widest text-text-main group-hover:text-primary transition-colors">
                    {title}
                </span>
                <span className="text-text-main group-hover:text-primary transition-colors">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pt-2 text-sm text-muted font-sans font-light leading-relaxed">
                            {items && items.length > 0 ? (
                                <ul className="space-y-1">
                                    {items.map((item, idx) => (
                                        <li key={idx}>- {item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{content}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
