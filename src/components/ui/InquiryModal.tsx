"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInquiryStore } from "@/store/use-inquiry-store";
import { X } from "lucide-react";

export function InquiryModal() {
    const { isOpen, closeInquiry, context } = useInquiryStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeInquiry}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-6"
                    >
                        <div className="bg-background relative shadow-2xl overflow-hidden border border-muted/20">
                            {/* Decorative Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                            {/* Close Button */}
                            <button
                                onClick={closeInquiry}
                                className="absolute top-6 right-6 text-foreground/50 hover:text-primary transition-colors"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>

                            <div className="p-8 md:p-12 space-y-8">
                                <div>
                                    <h2 className="font-serif text-3xl italic text-primary mb-2">Inquire</h2>
                                    <p className="text-sm font-sans tracking-wide opacity-60">
                                        Regarding: <span className="text-foreground">{context}</span>
                                    </p>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Inquiry sent (demo)"); closeInquiry(); }}>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs uppercase tracking-widest opacity-50 block">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full bg-transparent border-b border-muted/30 py-2 focus:outline-none focus:border-primary transition-colors font-sans text-foreground placeholder:opacity-30"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs uppercase tracking-widest opacity-50 block">Message</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="w-full bg-transparent border-b border-muted/30 py-2 focus:outline-none focus:border-primary transition-colors font-sans text-foreground resize-none placeholder:opacity-30"
                                            placeholder="Tell us about the space you are envisioning..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-background py-4 uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-colors mt-4"
                                    >
                                        Send Request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
