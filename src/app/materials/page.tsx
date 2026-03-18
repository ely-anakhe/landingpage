import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { client, urlFor } from "@/sanity/lib/client";
import { MATERIALS_QUERY } from "@/sanity/lib/queries/materials";

export const metadata = {
    title: "Materials & Craft | Anakhe",
    description: "We reject the artificial. Natural materials chosen for their beauty, durability, and connection to nature.",
};

export default async function MaterialsPage() {
    const materials = await client.fetch(MATERIALS_QUERY);
    return (
        <main className="bg-background min-h-screen">
            {/* Component 1: The Manifesto Hero (Revised) */}
            <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-24 bg-background">
                <Reveal>
                    {/* The Stamp */}
                    <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 mb-8">
                        A connection to nature
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    {/* The Headline */}
                    <h1 className="font-serif text-5xl md:text-7xl text-text-main leading-tight max-w-4xl">
                        Materials we return to.
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    {/* The Body */}
                    <div className="mt-12 max-w-2xl text-lg md:text-xl font-serif leading-relaxed text-gray-600 prose prose-p:mb-6">
                        <p>
                            True luxury is a home that supports health, comfort, and longevity,
                            which guides our preference for natural finishes. We avoid plastics
                            and toxic finishes wherever possible, choosing materials that age
                            gracefully and beautifully.
                        </p>
                        <br />
                        <p className="text-primary font-medium">
                            A selection of the studio’s favourites are outlined below.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.3}>
                    {/* The Divider */}
                    <div className="w-24 h-[1px] bg-gray-300 mt-20"></div>
                </Reveal>
            </section>

            {/* Component 2: The Materials Grid (Adjusted for blending) */}
            <section className="w-full">
                {materials.map((material: any, index: number) => {
                    const isEven = index % 2 === 0;
                    // Even: Text Left, Image Right
                    // Odd: Image Left, Text Right

                    return (
                        <div key={material._id} className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                            {/* Text Column */}
                            <div className={`bg-background p-12 lg:p-24 flex flex-col justify-center ${isEven ? 'order-2 md:order-1' : 'order-2'}`}>
                                <Reveal>
                                    <h3 className="font-serif text-4xl mb-6 text-primary">{material.title}</h3>
                                    <div className="prose prose-lg font-serif text-muted">
                                        <p>{material.description}</p>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Image Column */}
                            <div className={`relative h-[60vh] md:h-auto min-h-[400px] w-full ${isEven ? 'order-1 md:order-2' : 'order-1'}`}>
                                {material.image && (
                                    <Image
                                        src={urlFor(material.image).url()}
                                        alt={material.title || "Material Image"}
                                        fill
                                        className="object-cover"
                                        placeholder={material.image?.metadata?.lqip ? "blur" : "empty"}
                                        blurDataURL={material.image?.metadata?.lqip}
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
        </main >
    );
}
