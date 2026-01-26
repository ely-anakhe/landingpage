"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "next-sanity";
import { type PortableTextBlock } from "sanity";

interface FaqAccordionProps {
    question: string;
    answer: PortableTextBlock[];
}

export function FaqAccordion({ question, answer }: FaqAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-start text-left justify-between group"
                aria-expanded={isOpen}
            >
                <h3 className="font-serif text-lg text-text-main group-hover:text-primary transition-colors pr-8">
                    {question}
                </h3>
                <span className="text-text-main group-hover:text-primary transition-colors mt-1 shrink-0">
                    {isOpen ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 prose prose-p:font-sans prose-p:font-light prose-p:text-muted prose-li:font-sans prose-li:text-muted max-w-none">
                            <PortableText value={answer} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
