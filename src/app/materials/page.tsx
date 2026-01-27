import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function MaterialsPage() {
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

                {/* Item 1: Timber (Text Left, Image Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                    <div className="bg-background p-12 lg:p-24 flex flex-col justify-center order-2 md:order-1">
                        <Reveal>
                            <h3 className="font-serif text-4xl mb-6 text-primary">Renewable Timber</h3>
                            <div className="prose prose-lg font-serif text-muted">
                                <p>
                                    Wood is not a surface; it is a structure. It breathes. It moves. We use timber sourced from forests managed with the logic of continuity. To destroy the source of one’s craft is not just unethical; it is irrational. We take only what the earth can replace, ensuring the cycle of creation remains unbroken.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                    <div className="relative h-[60vh] md:h-auto min-h-[400px] w-full order-1 md:order-2">
                        <Image
                            src="/material_timber.png"
                            alt="Renewable Timber"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Item 2: Quartz (Image Left, Text Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                    <div className="relative h-[60vh] md:h-auto min-h-[400px] w-full">
                        <Image
                            src="/material_quartz.png"
                            alt="Quartz & Stone"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-background p-12 lg:p-24 flex flex-col justify-center">
                        <Reveal>
                            <h3 className="font-serif text-4xl mb-6 text-primary">Quartz & Stone</h3>
                            <div className="prose prose-lg font-serif text-muted">
                                <p>
                                    We demand permanence. Quartz is the earth compressed into absolute solidity. It does not fear use. It does not ask to be handled delicately. It is there to serve the purpose of the room—to hold weight, to endure heat, to survive the friction of living without eroding.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Item 3: Linen (Text Left, Image Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                    <div className="bg-background p-12 lg:p-24 flex flex-col justify-center order-2 md:order-1">
                        <Reveal>
                            <h3 className="font-serif text-4xl mb-6 text-primary">Pure Linen</h3>
                            <div className="prose prose-lg font-serif text-muted">
                                <p>
                                    Linen is not synthesized in a lab; it is grown from the soil. It possesses a tensile strength that synthetic fibers cannot mimic. It has a texture that engages the hand—cool, crisp, and unpretentious. It does not hide its weave; it declares it.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                    <div className="relative h-[60vh] md:h-auto min-h-[400px] w-full order-1 md:order-2">
                        <Image
                            src="/material_linen.png"
                            alt="Pure Linen"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Item 4: Velvet (Image Left, Text Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
                    <div className="relative h-[60vh] md:h-auto min-h-[400px] w-full">
                        <Image
                            src="/material_velvet.png"
                            alt="Cotton Velvet"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="bg-background p-12 lg:p-24 flex flex-col justify-center">
                        <Reveal>
                            <h3 className="font-serif text-4xl mb-6 text-primary">Cotton Velvet</h3>
                            <div className="prose prose-lg font-serif text-muted">
                                <p>
                                    We reject synthetics that shine cheaply. We choose cotton velvet for its depth. It absorbs light rather than reflecting it. It offers a softness that is substantial, not flimsy. It wears its history, marking the passage of time and the comfort of its owner.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>

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
