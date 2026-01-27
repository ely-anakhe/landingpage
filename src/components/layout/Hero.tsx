"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Background Texture / Abstract Element Placeholder (e.g. Video or blurred shape) */}
            <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neutral-200 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="max-w-4xl"
            >
                <h2 className="font-serif text-sm md:text-base uppercase tracking-[0.4em] text-muted mb-8">
                    Interior Design & Bespoke Atelier
                </h2>

                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-primary leading-none mb-10 tracking-tight">
                    Spaces that<br />
                    <span className="italic">Breathe</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="font-serif text-lg md:text-xl text-foreground/80 max-w-lg mx-auto leading-relaxed"
                >
                    We do not furnish rooms. We curate conviction.
                    Enter the conviction engine.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <span className="text-xs uppercase tracking-widest opacity-50 block mb-2 animate-pulse">Scroll</span>
                <div className="w-[1px] h-12 bg-primary/30 mx-auto" />
            </motion.div>
        </section>
    );
}
