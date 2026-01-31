"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "next-sanity";

// We define clean interfaces for what the component needs
interface SizeVariant {
    _key: string;
    name: string;
    specs?: string[];
    imageUrl?: string;
}

interface DimensionsSectionProps {
    heading?: string;
    description?: any; // PortableText value
    bespokeOptions?: string[];
    sizeVariants: SizeVariant[];
}

export function DimensionsSection({
    heading = "Dimensions & Details",
    description,
    bespokeOptions,
    sizeVariants
}: DimensionsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // If no variants, we can't show much interactive content
    // But we should still safely handle it.
    const hasVariants = sizeVariants && sizeVariants.length > 0;
    const activeVariant = hasVariants ? sizeVariants[activeIndex] : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

            {/* Left Column: Specifications Text */}
            <div className="lg:col-span-5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 font-normal text-text-main">
                    {heading}
                </h2>

                {description && (
                    <div className="mb-12 prose prose-lg">
                        <PortableText value={description} />
                    </div>
                )}

                <div className="space-y-8 font-serif text-lg text-text-main/80">

                    {/* Active Variant Specifications */}
                    {activeVariant && activeVariant.specs && activeVariant.specs.length > 0 && (
                        <motion.div
                            key={`specs-${activeVariant._key}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="font-serif text-xl italic text-primary mb-4 border-b border-border pb-2">
                                Specifications ({activeVariant.name})
                            </h3>
                            <ul className="space-y-3 font-light">
                                {activeVariant.specs.map((spec, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-4 shrink-0" />
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* Bespoke Options (Static) */}
                    {bespokeOptions && bespokeOptions.length > 0 && (
                        <div>
                            <h3 className="font-serif text-xl italic text-primary mb-4 border-b border-border pb-2">Bespoke Options</h3>
                            <ul className="space-y-3 font-light">
                                {bespokeOptions.map((opt, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-4 shrink-0" />
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Size Selector & Diagram */}
            <div className="lg:col-span-7 flex flex-col items-center">
                {hasVariants && (
                    <div className="w-full">
                        {/* Tabs */}
                        {sizeVariants.length > 1 && (
                            <div className="flex justify-center mb-8">
                                <div className="inline-flex bg-surface/50 p-1 rounded-sm">
                                    {sizeVariants.map((variant, index) => (
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
                                key={activeVariant?._key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-[4/3] w-full max-w-2xl mx-auto bg-surface/30 overflow-hidden"
                            >
                                {activeVariant?.imageUrl ? (
                                    <Image
                                        src={activeVariant.imageUrl}
                                        alt={`${activeVariant.name} dimensions`}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <p className="font-serif text-xl text-muted italic">
                                            {activeVariant ? `${activeVariant.name} diagram` : 'No diagram available'}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
