import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { urlFor } from "@/sanity/lib/client";

interface MaterialsSectionProps {
    image?: any;
}

export function MaterialsSection({ image }: MaterialsSectionProps) {
    return (
        <section className="bg-surface py-32 relative">
            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Visual Logic: Asymmetric overlap. Media takes right 80%. */}
                <div className="w-full md:w-[80%] ml-auto h-[400px] md:h-[500px] relative">
                    {image ? (
                        <Image
                            src={urlFor(image).url()}
                            alt={image.alt || "The Integrity of Matter"}
                            fill
                            className="object-cover grayscale-[20%]"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
                            blurDataURL={image.asset?.metadata?.lqip}
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-muted font-serif italic opacity-50">
                            Materials Image
                        </div>
                    )}
                </div>

                {/* Text Card (Overlay) */}
                <div className="relative md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-[40%] bg-background p-10 shadow-sm md:shadow-none mt-[-50px] md:mt-0 z-10">
                    <Reveal width="100%">
                        <h2 className="font-sans uppercase tracking-[0.2em] text-xs mb-6 text-text-main">
                            The Integrity of Matter
                        </h2>
                        <p className="font-serif text-xl leading-relaxed text-text-main">
                            We reject the artificial. We build with the weight of the earth—stone, solid timber, and unlacquered brass. Materials that do not ruin with age, but evolve.
                        </p>

                        <Link
                            href="/materials"
                            className="inline-block border border-primary text-primary px-8 py-3 mt-8 font-serif text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            Discover the Craft
                        </Link>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
