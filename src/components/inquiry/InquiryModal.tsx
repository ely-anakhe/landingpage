"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInquiryStore } from "@/lib/store/inquiryStore"
import { X } from "lucide-react"
import { InquiryForm } from "./InquiryForm"

export function InquiryModal() {
    const { isOpen, closeInquiry, contextPiece } = useInquiryStore()

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

                    {/* Modal Content - Slide in from right */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-[101] w-full md:w-[480px] bg-background shadow-2xl flex flex-col h-full overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 md:p-8 border-b border-muted/10 sticky top-0 bg-background/95 backdrop-blur z-10">
                            <h2 className="font-serif text-3xl italic text-primary">Inquire</h2>
                            <button
                                onClick={closeInquiry}
                                className="text-muted-foreground/50 hover:text-foreground transition-colors p-2"
                                aria-label="Close inquiry modal"
                            >
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 flex-1">
                            {/* Context Banner */}
                            {contextPiece && (
                                <div className="mb-8 p-4 bg-muted/5 border-l-2 border-primary/20">
                                    <p className="text-sm font-serif tracking-wide opacity-80">
                                        Regarding: <span className="font-semibold text-foreground">{contextPiece.title}</span>
                                    </p>
                                </div>
                            )}

                            {/* Form */}
                            <InquiryForm />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
