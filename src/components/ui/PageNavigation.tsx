import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
    slug: string;
    title?: string;
}

interface PageNavigationProps {
    prev?: NavigationItem | null;
    next?: NavigationItem | null;
    basePath: string; // e.g. "/interiors" or "/atelier"
    className?: string;
}

export function PageNavigation({ prev, next, basePath, className }: PageNavigationProps) {
    if (!prev && !next) return null;

    return (
        <div className={cn("flex justify-between items-center w-full py-4 border-t border-border mt-8 pt-4", className)}>

            {prev ? (
                <Link
                    href={`${basePath}/${prev.slug}`}
                    className="group flex items-center gap-2 transition-opacity hover:opacity-70"
                    aria-label={`Previous: ${prev.title || 'Previous item'}`}
                >
                    <ArrowLeft className="w-4 h-4 text-muted group-hover:text-text-main" />
                    <span className="font-serif italic text-sm text-text-main">
                        PREV
                    </span>
                </Link>
            ) : <div />}

            {next ? (
                <Link
                    href={`${basePath}/${next.slug}`}
                    className="group flex items-center gap-2 transition-opacity hover:opacity-70"
                    aria-label={`Next: ${next.title || 'Next item'}`}
                >
                    <span className="font-serif italic text-sm text-text-main">
                        NEXT
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-text-main" />
                </Link>
            ) : <div />}
        </div>
    );
}
