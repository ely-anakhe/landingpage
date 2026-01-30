import { client, urlFor } from "@/sanity/lib/client";
import { ATELIER_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { AtelierCard } from "@/components/atelier/AtelierCard";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";


// export const revalidate = 60;

export default async function AtelierPage() {
    const pieces = await client.fetch(ATELIER_QUERY);
    const settings = await client.fetch(SETTINGS_QUERY);

    const heroImage = settings?.atelierHeroImage;

    return (
        <main>
            <Container className="py-24">
                <header className="mb-20 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                        The Atelier
                    </h1>
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                        Furniture & Objects
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {pieces.map((piece: any) => (
                        <AtelierCard key={piece._id} piece={piece} />
                    ))}
                </div>
            </Container>

            <section className="w-full h-[400px] relative flex items-center justify-center overflow-hidden mt-24">
                {/* Background */}
                <div className="absolute inset-0">
                    {heroImage ? (
                        <Image
                            src={urlFor(heroImage).url()}
                            alt={heroImage.alt || "Raw Material Texture"}
                            fill
                            className="object-cover grayscale sepia-[.2]"
                            quality={90}
                            placeholder={heroImage.asset?.metadata?.lqip ? "blur" : "empty"}
                            blurDataURL={heroImage.asset?.metadata?.lqip}
                        />
                    ) : (
                        <Image
                            src="/material_quartz.png" // Fallback until set in Studio
                            alt="Raw Material Texture"
                            fill
                            className="object-cover grayscale sepia-[.2]"
                            quality={90}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/50 z-10" />
                </div>

                {/* Content */}
                <div className="relative z-20 text-center px-4">
                    <h2 className="font-sans text-white text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
                        We Do Not Manufacture. We Harvest.
                    </h2>
                    <p className="font-serif text-white/90 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-8">
                        The difference between a commodity and an heirloom...
                    </p>
                    <Link
                        href="/materials"
                        className="inline-block border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-widest text-[10px]"
                    >
                        DISCOVER OUR MATERIALS
                    </Link>
                </div>
            </section>
        </main>
    );
}
