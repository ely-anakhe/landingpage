import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

interface ArtistShowcaseProps {
    image?: any;
}

export function ArtistShowcase({ image }: ArtistShowcaseProps) {
    return (
        <section className="bg-background py-32">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative">

                    {/* Image Column (Cols 1-5) */}
                    <div className="md:col-span-5 relative">
                        <Link href="https://jordananais.com" target="_blank" rel="noopener noreferrer" className="block relative aspect-[3/4] bg-neutral-100 grayscale hover:opacity-90 transition-opacity">
                            <Image
                                src={image ? urlFor(image).url() : "/images/jordan-anais-showcase.png"}
                                alt="Jordan Anais"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </Link>


                    </div>

                    {/* Text Column (Cols 7-12) */}
                    <div className="md:col-span-6 md:col-start-7 space-y-8">
                        <div>
                            <h2 className="font-serif text-4xl mb-6 text-text-main">
                                <Link href="/about" className="hover:opacity-70 transition-opacity">
                                    The Founder
                                </Link>
                            </h2>

                            <div className="space-y-6 text-gray-600 font-serif text-lg leading-relaxed">
                                <p>
                                    Jordan Anais is an artist, designer, and tastemaker based in Los
                                    Angeles. With a background steeped in the classical traditions of
                                    European architecture and an eye heavily influenced by the raw,
                                    organic textures of the California coast, Jordan has crafted a
                                    distinct artistic style that balances refinement with restraint.
                                </p>

                                <p>
                                    Inspired by the fusion of Old World elements married with bold,
                                    modern-day techniques, he has been experimenting with an
                                    avant-garde approach to classical portraits since 2009.
                                </p>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="pt-4">
                            <span className="font-handwriting text-5xl text-text-main block -rotate-3">
                                Jordan Anais
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
