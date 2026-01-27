"use client";

import { Container } from "@/components/ui/Container";
import { AtelierCard } from "@/components/atelier/AtelierCard";
import Link from "next/link";

interface Piece {
    _id: string;
    title: string;
    slug: { current: string };
    heroImage: any;
    category?: string;
    priceDisplay?: string;
    mainImage: any;
    shortDescription?: string;
}

interface AtelierSectionProps {
    pieces: Piece[];
}

export function AtelierSection({ pieces }: AtelierSectionProps) {
    return (
        <section className="bg-surface pt-40 pb-24">
            <Container>
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    {/* Left Column: Text Content (25%) */}
                    <div className="w-full md:w-1/4 space-y-8">
                        <div>
                            <span className="font-serif text-xs tracking-[0.2em] uppercase text-gray-500 block mb-4">
                                The Atelier
                            </span>
                            <h2 className="font-serif text-4xl text-text-main mb-6">
                                The Collection
                            </h2>
                            <p className="font-serif text-muted italic leading-relaxed">
                                Furniture that bridges the gap between the functional and the sculptural.
                                <br />
                                <br />
                                Made by hand.
                                <br />
                                Made to last.
                            </p>
                        </div>

                        <Link
                            href="/atelier"
                            className="inline-block border-b border-primary/30 pb-1 font-serif text-xs tracking-[0.15em] uppercase text-text-main hover:text-primary hover:border-primary transition-all duration-300"
                        >
                            Visit the Atelier
                        </Link>
                    </div>

                    {/* Right Column: Items Grid (75%) */}
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full group/atelier">
                            {pieces && pieces.length > 0 ? (
                                pieces.map((piece) => (
                                    <div
                                        key={piece._id}
                                        className="transition-all duration-500 ease-out group-hover/atelier:opacity-50 hover:!opacity-100 hover:scale-[1.02]"
                                    >
                                        <AtelierCard piece={piece} />
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-full text-center text-muted">No pieces available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
