import { notFound } from "next/navigation";

// Atelier detail pages are currently hidden. Re-enable when ready.
// Empty generateStaticParams is required for `output: export` on dynamic routes.
export function generateStaticParams() {
    return [];
}

export default function PiecePage() {
    notFound();
}
