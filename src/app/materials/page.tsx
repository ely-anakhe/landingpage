import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { client, urlFor } from "@/sanity/lib/client";
import { MATERIALS_QUERY } from "@/sanity/lib/queries";

export default async function MaterialsPage() {
    const materials = await client.fetch(MATERIALS_QUERY);
    return (
        <main className="bg-background min-h-screen">
            {/* Component 1: The Manifesto Hero (Revised) */}
            <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-24 bg-background">
                <Reveal>
                    {/* The Stamp */}
                    <h2 className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gray-500 mb-8">
                        The Integrity of Matter
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    {/* The Headline */}
                    <h1 className="font-serif text-5xl md:text-7xl text-text-main leading-tight max-w-4xl">
                        We do not decorate. We build.
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    {/* The Body */}
                    <div className="mt-12 max-w-2xl text-lg md:text-xl font-serif leading-relaxed text-gray-600 prose prose-p:mb-6">
                        <p>
                            Most of the world is wrapped in a lie. We live in rooms filled with plastic
                            disguised as wood, polyester pretending to be silk, and veneers that peel away
                            to reveal the emptiness underneath. These materials are not just cheap; they
                            are dishonest. They are designed to decay from the moment they are made.
                        </p>
                        <p>
                            We reject the artificial. Not out of nostalgia, and not for the sake of a trend.
                            We reject it because a man cannot find truth in a room built on illusion.
                        </p>
                        <p className="text-primary font-medium">
                            To flourish, the human spirit requires an environment of equal dignity. It
                            demands materials that are as real as the life being lived within them.
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

            {/* Component 4: The Closer */}
            <section className="max-w-2xl mx-auto py-32 text-center px-6">
                <Reveal>
                    <div className="font-serif text-xl leading-relaxed text-gray-700 space-y-8">
                        <div>
                            <h3 className="font-sans uppercase tracking-[0.2em] text-sm text-primary mb-4">The Virtue of Age</h3>
                            <p>
                                The ultimate test of a material is time.
                            </p>
                            <p>
                                Synthetic materials do not age; they ruin. A scratch on plastic is a scar. A chip in veneer is a defect. They become garbage.
                            </p>
                            <p>
                                Natural materials do not ruin; they evolve. The timber deepens in color. The velvet crushes to fit the body that rests on it. The stone wears smooth underfoot.
                            </p>
                            <p>
                                We build furniture and spaces designed to outlive us. This is the only definition of sustainability that matters: Permanence. We do not create disposable objects for a disposable culture. We create heirs.
                            </p>
                        </div>

                        <div className="pt-12">
                            <h3 className="font-sans uppercase tracking-[0.2em] text-sm text-primary mb-4">The Result</h3>
                            <p>
                                Why does this matter? Because your environment is the mold of your mind.
                            </p>
                            <p>
                                You cannot think clearly in a room that feels temporary. You cannot rest deeply on a sofa that feels like plastic.
                            </p>
                            <p>
                                We use these materials because you deserve to live among things that are true. When the noise of the world is stripped away, and you are left with only the essential, you find room to breathe. You find room to think. You find the space to become who you are.
                            </p>
                        </div>
                    </div>

                    <span className="text-3xl md:text-4xl font-serif text-primary mt-12 block italic">
                        This is not luxury. This is reality.
                    </span>
                </Reveal>
            </section>
        </main>
    );
}
