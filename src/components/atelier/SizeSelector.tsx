"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SizeVariant {
    _key: string;
    name: string;
    specs?: string[];
    imageUrl?: string;
}

interface SizeSelectorProps {
    variants: SizeVariant[];
}

export function SizeSelector({ variants }: SizeSelectorProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!variants || variants.length === 0) {
        return (
            <div className="aspect-[4/3] w-full bg-surface/50 flex items-center justify-center">
                <p className="font-serif text-xl text-muted italic">Dimensions diagram</p>
            </div>
        );
    }

    const activeVariant = variants[activeIndex];

    return (
        <div className="w-full">
            {/* Size Toggle Tabs */}
            {variants.length > 1 && (
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-surface/50 p-1 rounded-sm">
                        {variants.map((variant, index) => (
                            <button
                                key={variant._key}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                    relative px-6 py-3 font-serif text-lg transition-all duration-300
                                    ${activeIndex === index
                                        ? 'text-primary'
                                        : 'text-text-main/60 hover:text-text-main'
                                    }
                                `}
                            >
                                {activeIndex === index && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-background border border-border/30"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{variant.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Diagram Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVariant._key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[4/3] w-full max-w-2xl mx-auto bg-surface/30 overflow-hidden"
                >
                    {activeVariant.imageUrl ? (
                        <Image
                            src={activeVariant.imageUrl}
                            alt={`${activeVariant.name} dimensions`}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="font-serif text-xl text-muted italic">{activeVariant.name} diagram</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
