import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

interface ArtistShowcaseProps {
    image?: any;
    text?: string;
}

export function ArtistShowcase({ image, text }: ArtistShowcaseProps) {
    const defaultText = `Founded by Jordan Anais, a British designer with an established presence in the health and lifestyle sphere, the studio carries a unique focus on human wellbeing by crafting interiors with health and longevity at their core. Influenced by European heritage and California ease, she approaches each project as both a creative and strategic exercise. Spaces are designed to look beautiful, to function seamlessly, to age gracefully, and to communicate something meaningful about the people behind them.\n\nA graduate in philosophy from Kings College London, with a masters degree from the London School of Economics, her academic foundation informs every aspect of her work. She has long been fascinated by the way aesthetics shape human experience and emotion, approaching design as a discipline that reflects values, esteem, and a sense of life in order to create an experience that connects the mind and body.`;
    const paragraphs = (text || defaultText).split('\n').filter((p: string) => p.trim() !== '');

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
                                placeholder={image?.asset?.metadata?.lqip ? "blur" : "empty"}
                                blurDataURL={image?.asset?.metadata?.lqip}
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
                                {paragraphs.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="pt-4 flex justify-end">
                            <Image
                                src="/signature.png"
                                alt="Jordan Anais signature"
                                width={250}
                                height={120}
                                className="mix-blend-multiply opacity-80 -rotate-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
