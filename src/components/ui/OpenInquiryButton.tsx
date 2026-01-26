"use client";

import { useInquiryStore } from "@/lib/store/inquiryStore";
import { cn } from "@/lib/utils";

interface OpenInquiryButtonProps {
    label?: string;
    piece?: { title: string; slug: string };
    className?: string;
    variant?: "primary" | "link" | "ghost";
}

export function OpenInquiryButton({
    label = "Inquire",
    piece,
    className,
    variant = "primary"
}: OpenInquiryButtonProps) {
    const { openInquiry } = useInquiryStore();

    const handleOpen = () => {
        openInquiry(piece);
    };

    if (variant === "ghost") {
        return (
            <button
                onClick={handleOpen}
                className={cn("transition-colors", className)}
            >
                {label}
            </button>
        );
    }

    if (variant === "link") {
        return (
            <button
                onClick={handleOpen}
                className={cn("text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors", className)}
            >
                {label}
            </button>
        );
    }

    return (
        <button
            onClick={handleOpen}
            className={cn(
                "bg-primary text-white font-serif italic text-lg px-8 py-2 rounded-sm hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02]",
                className
            )}
            aria-label={label}
        >
            {label}
        </button>
    );
}
