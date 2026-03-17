import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = {
    title: "About | Anakhe",
    description: "About Jordan Anais and the philosophy behind Anakhe.",
};



export default async function AboutPage() {
    const settings = await client.fetch(SETTINGS_QUERY);

    return (
        <article className="min-h-screen bg-background">
            {/* 1. Bio Section */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">

                    {/* Portrait Image */}
                    <div className="relative aspect-[3/4] bg-surface-dark/5 w-full">
                        {/* Jordan's Portrait */}
                        {settings?.aboutPortrait ? (
                            <Image
                                src={urlFor(settings.aboutPortrait).url()}
                                alt={settings.aboutPortrait.alt || "Jordan Anais"}
                                fill
                                className="object-cover grayscale"
                                placeholder={settings.aboutPortrait.asset?.metadata?.lqip ? "blur" : "empty"}
                                blurDataURL={settings.aboutPortrait.asset?.metadata?.lqip}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted font-serif italic text-lg opacity-50">
                                [Portrait Image]
                            </div>
                        )}
                    </div>

                    {/* Interior Image */}
                    <div className="relative aspect-[3/4] bg-surface-dark/5 w-full">
                        {settings?.aboutInteriorImage ? (
                            <Image
                                src={urlFor(settings.aboutInteriorImage).url()}
                                alt={settings.aboutInteriorImage.alt || "Interior Design"}
                                fill
                                className="object-cover"
                                placeholder={settings.aboutInteriorImage.asset?.metadata?.lqip ? "blur" : "empty"}
                                blurDataURL={settings.aboutInteriorImage.asset?.metadata?.lqip}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted font-serif italic text-lg opacity-50">
                                [Interior Image]
                            </div>
                        )}
                    </div>

                    {/* Bio Copy */}
                    <div className="pt-8 md:pt-0">
                        <h1 className="font-serif text-4xl md:text-5xl text-left mb-12 tracking-wide uppercase">
                            About
                        </h1>

                        <div className="space-y-8 font-serif font-light text-text-main/80 text-lg leading-relaxed text-justify">
                            <p>
                                <span className="float-left text-7xl leading-[0.8] pr-4 pt-2 font-serif">J</span>
                                ordan Anais, a British designer with an established presence in the health and lifestyle
                                sphere, the studio carries a unique focus on human wellbeing by crafting interiors with health and
                                longevity at their core. Influenced by European heritage and California ease, she approaches each
                                project as both a creative and strategic exercise. Spaces are designed to look beautiful, to function
                                seamlessly, to age gracefully, and to communicate something meaningful about the people behind them.

                            </p>

                            <p>
                                A graduate in philosophy from Kings College London, with a masters degree from the London School of
                                Economics, her academic foundation informs every aspect of her work. She has long been fascinated by
                                the way aesthetics shape human experience and emotion, approaching design as a discipline that
                                reflects values, esteem, and a sense of life in order to create an experience that connects the mind
                                and body.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>


            {/* 2. Poem Section */}
            <section className="py-16 bg-surface-dark/5">
                <Container>
                    <div className="max-w-2xl mx-auto text-center space-y-8">

                        <div className="font-serif text-2xl md:text-3xl italic leading-loose text-text-main opacity-80">
                            <p>
                                "I don't design to have clients,<br />
                                I have clients in order to design"
                            </p>
                        </div>

                        <p className="font-serif text-xs tracking-[0.2em] uppercase text-muted mt-8">
                            — Jordan Anais
                        </p>

                    </div>
                </Container>
            </section>



        </article>
    );
}
