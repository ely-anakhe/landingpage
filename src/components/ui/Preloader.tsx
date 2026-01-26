"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check session storage
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        // Lock scroll
        document.body.style.overflow = "hidden";

        // Set visited flag
        sessionStorage.setItem("hasVisited", "true");

        // Timeout to hide preloader
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-serif text-3xl md:text-5xl tracking-[0.2em] text-primary uppercase"
                    >
                        Anakhe
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
