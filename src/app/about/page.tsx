import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { client, urlFor } from "@/sanity/lib/client";
import { PRESS_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata = {
    title: "About | Anakhe",
    description: "About Jordan Anais and the philosophy behind Anakhe.",
};

// export const revalidate = 60;

export default async function AboutPage() {
    const articles = await client.fetch(PRESS_QUERY);
    const settings = await client.fetch(SETTINGS_QUERY);

    return (
        <article className="min-h-screen bg-background">
            {/* 1. Bio Section */}
            <Container className="py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Portrait Image */}
                    <div className="md:col-span-6 lg:col-span-5 relative aspect-[3/4] bg-surface-dark/5">
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

                    {/* Bio Copy */}
                    <div className="md:col-span-6 lg:col-span-6 lg:col-start-7 pt-8 md:pt-16">
                        <h1 className="font-serif text-4xl md:text-5xl text-center mb-16 tracking-wide">
                            ABOUT
                        </h1>

                        <div className="space-y-8 font-serif font-light text-text-main/80 text-lg leading-relaxed text-justify">
                            <p>
                                <span className="float-left text-7xl leading-[0.8] pr-4 pt-2 font-serif">J</span>
                                ordan Anais is an artist, designer, and tastemaker based in Los Angeles.
                                With a background steeped in the classical traditions of European architecture and an eye heavily influenced by the raw, organic textures of the California coast, Jordan has crafted a distinct artistic style that balances refinement with restraint.
                            </p>

                            <p>
                                After founding Anakhe in 2024, Jordan began working to redefine the concept of the modern sanctuary. Not merely as a physical space, but as an emotional landscape where silence, texture, and light converge to create a sense of profound stillness.
                            </p>

                            <p>
                                Inspired by the Japanese philosophy of Wabi-Sabi and the timeless elegance of French modernism, Jordan explores an avant-garde approach to interior curation. His work has been featured in leading design publications, celebrating his unique ability to marry the old world with the new.
                            </p>

                            <p>
                                He collaborates with artisans globally, ensuring that every piece—from a hand-hewn chair to a bespoke linen sofa—carries the imprint of the human hand and the spirit of its maker.
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


            {/* 3. Articles / Words Section */}
            <Container className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif text-3xl text-center mb-16 italic">Words by Jordan</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {articles.map((article: any) => (
                            <a
                                key={article._id}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                            >
                                {/* Card Image Area */}
                                <div className="relative overflow-hidden aspect-[4/5] bg-surface-dark/5 mb-6">
                                    {article.image ? (
                                        <Image
                                            src={urlFor(article.image).width(600).url()}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted font-serif italic text-sm">
                                            [Article Image]
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="text-center space-y-2">
                                    <h3 className="font-serif text-xl text-text-main group-hover:text-primary transition-colors duration-300 px-4">
                                        {article.title}
                                    </h3>

                                    <div className="flex items-center justify-center gap-2 text-xs font-serif tracking-widest uppercase text-muted group-hover:text-primary/70 transition-colors">
                                        <span>{article.publication}</span>
                                        <span className="w-1 h-1 bg-current rounded-full" />
                                        <span>{new Date(article.publishedAt).getFullYear()}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </Container>

        </article>
    );
}
