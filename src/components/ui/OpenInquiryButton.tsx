"use client";

import { useInquiryStore } from "@/store/use-inquiry-store";
import { cn } from "@/lib/utils";

interface OpenInquiryButtonProps {
    label?: string;
    context?: string;
    className?: string;
    variant?: "primary" | "link" | "ghost";
}

export function OpenInquiryButton({
    label = "Inquire",
    context = "General Inquiry",
    className,
    variant = "primary"
}: OpenInquiryButtonProps) {
    const { openInquiry } = useInquiryStore();

    const handleOpen = () => {
        openInquiry(context);
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
