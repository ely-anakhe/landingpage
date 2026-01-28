"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { urlFor } from "@/sanity/lib/client";

interface HeroContent {
    _type: "image" | "mux.video";
    asset: any;
    alt?: string;
    playbackId?: string;
}

interface HeroCarouselProps {
    content?: HeroContent[];
}

export function HeroCarousel({ content = [] }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter out items without valid assets
    const validContent = content.filter(item => {
        if (item._type === "image") return !!item.asset;
        if (item._type === "mux.video") return !!item.asset?.playbackId;
        return false;
    });

    useEffect(() => {
        if (validContent.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % validContent.length);
        }, 8000); // 8 seconds per slide

        return () => clearInterval(interval);
    }, [validContent.length]);

    if (!validContent.length) {
        // Fallback or empty state
        return (
            <div className="relative h-[80vh] w-full bg-neutral-200">
                <div className="w-full h-full bg-neutral-100 animate-pulse" />
            </div>
        );
    }

    return (
        <section className="relative w-full flex flex-col">
            {/* Media Section */}
            <div className="relative w-full h-[100dvh] bg-neutral-900 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                    {validContent.map((item, index) => {
                        const isCurrent = index === currentIndex;
                        if (!isCurrent) return null;

                        return (
                            <motion.div
                                key={`${item._type}-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {item._type === "mux.video" ? (
                                    <div className="w-full h-full relative">
                                        <MuxPlayer
                                            playbackId={item.asset.playbackId}
                                            autoPlay="muted"
                                            loop
                                            muted
                                            className="w-full h-full object-cover"
                                            style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                        />
                                        {/* Overlay for contrast - Reduced now that text is not on top */}
                                        <div className="absolute inset-0 bg-black/10" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={urlFor(item.asset).url()}
                                            alt={item.alt || "Anakhe Interior"}
                                            fill
                                            className="object-cover"
                                            priority
                                            sizes="100vw"
                                            placeholder={item.asset?.metadata?.lqip ? "blur" : "empty"}
                                            blurDataURL={item.asset?.metadata?.lqip}
                                        />
                                        {/* Overlay for contrast */}
                                        <div className="absolute inset-0 bg-black/5" />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Scroll Indicator - Kept on image for visual connection to fold */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white"
                >
                    <span className="text-[10px] uppercase tracking-widest opacity-70 block mb-2 animate-pulse text-center">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/50 mx-auto" />
                </motion.div>
            </div>

            {/* Content Section - Below Media */}
            <div className="w-full bg-background min-h-screen px-6 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <h2 className="font-serif text-xs md:text-sm uppercase tracking-[0.4em] text-muted mb-6">
                        Interior Design & Bespoke Atelier
                    </h2>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-8 tracking-tight text-primary">
                        Spaces that<br />
                        <span className="italic font-light">Breathe</span>
                    </h1>

                    <p className="font-serif text-lg md:text-xl text-foreground/80 max-w-lg mx-auto leading-relaxed font-light">
                        We do not furnish rooms. We curate conviction.
                        Enter the conviction engine.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
