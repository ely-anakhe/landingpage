
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface PhilosophySectionProps {
    image?: any;
    text?: string;
}

export function PhilosophySection({ image, text }: PhilosophySectionProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
            {/* Left Side (Theory) */}
            <div className="bg-[#4A0404] text-white flex flex-col justify-center p-12 md:p-20 order-2 md:order-1">
                <div className="max-w-md mx-auto md:mx-0">
                    <h2 className="font-sans uppercase tracking-[0.2em] text-xs mb-8 opacity-70">
                        The Philosophy
                    </h2>
                    <p className="font-serif text-xl md:text-2xl leading-relaxed">
                        {text || "In a world of noise, we design silence. Every piece is a sanctuary. Every room is a pause."}
                    </p>
                </div>
            </div>

            {/* Right Side (Reality) */}
            <div className="relative h-full w-full min-h-[400px] order-1 md:order-2 bg-neutral-200">
                {image ? (
                    <Image
                        src={urlFor(image).url()}
                        alt={image.alt || "Philosophy Texture"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
                        blurDataURL={image.asset?.metadata?.lqip}
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-300 animate-pulse" />
                )}
            </div>
        </section>
    );
}
