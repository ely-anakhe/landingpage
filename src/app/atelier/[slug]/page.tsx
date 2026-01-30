import { client, urlFor } from "@/sanity/lib/client";
import { PIECE_DETAIL_QUERY, ATELIER_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";
import { SpecAccordion } from "@/components/atelier/SpecAccordion";
import { ProjectCard } from "@/components/interiors/ProjectCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { PortableText } from "next-sanity";

// export const revalidate = 60;

export async function generateStaticParams() {
    const pieces = await client.fetch(ATELIER_QUERY);
    return pieces.map((piece: any) => ({
        slug: piece.slug.current,
    }));
}

export default async function PiecePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const piece = await client.fetch(PIECE_DETAIL_QUERY, { slug });

    if (!piece) {
        notFound();
    }

    const {
        title,
        priceDisplay,
        shortDescription,
        story,
        mainImage,
        specifications,
        bespokeOptions,
        relatedProjects,
        relatedFAQs,
        video,
        gallery,
        materials
    } = piece;

    return (
        <article className="min-h-screen bg-background text-text-main pb-32">

            {/* Hero Section - Cinematic */}
            <section className="relative w-full h-[85vh] lg:h-screen">
                {video ? (
                    <div className="absolute inset-0 w-full h-full bg-black/10">
                        <VideoPlayer playbackId={video.playbackId} className="w-full h-full object-cover" />
                    </div>
                ) : mainImage ? (
                    <div className="absolute inset-0 w-full h-full select-none">
                        <Image
                            src={urlFor(mainImage).width(1920).quality(90).url()}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                            placeholder={mainImage.metadata?.lqip ? "blur" : "empty"}
                            blurDataURL={mainImage.metadata?.lqip}
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-24 bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white">
                    <Container className="!px-0">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tight">
                            {title}
                        </h1>
                        {priceDisplay && (
                            <p className="font-serif italic text-2xl md:text-3xl font-light opacity-90">
                                {priceDisplay}
                            </p>
                        )}
                    </Container>
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-24 lg:py-40">
                <Container className="max-w-4xl mx-auto space-y-12 text-center">
                    {story ? (
                        <div className="prose prose-lg md:prose-xl font-serif prose-p:font-light prose-headings:font-normal mx-auto prose-blockquote:italic text-text-main">
                            <PortableText value={story} />
                        </div>
                    ) : (
                        <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-text-main/80">
                            {shortDescription}
                        </p>
                    )}

                    <div className="pt-12">
                        <OpenInquiryButton
                            label="Inquire to Purchase"
                            piece={{ title, slug }}
                            className="text-lg px-8 py-4"
                        />
                    </div>
                </Container>
            </section>

            {/* Detail Specs & Features */}
            <section className="py-12 border-t border-border/40">
                <Container className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <div className="space-y-8">
                            {specifications && specifications.length > 0 && (
                                <SpecAccordion title="Specifications" items={specifications} />
                            )}
                        </div>
                        <div className="space-y-8">
                            {bespokeOptions && bespokeOptions.length > 0 && (
                                <SpecAccordion title="Bespoke Options" items={bespokeOptions} />
                            )}
                            <SpecAccordion title="Shipping & Delivery" content="White glove delivery available worldwide. Please inquire for a quote to your location." />
                        </div>
                    </div>
                </Container>
            </section>


            {/* Materials Showcase */}
            {materials && materials.length > 0 && (
                <section className="py-24 lg:py-32 bg-surface/30">
                    <Container>
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">Materiality</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                            {materials.map((mat: any) => (
                                <div key={mat._id} className="group">
                                    <div className="relative aspect-square overflow-hidden mb-6 bg-surface">
                                        {mat.image && (
                                            <Image
                                                src={urlFor(mat.image).width(800).height(800).url()}
                                                alt={mat.title || 'Material'}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                    </div>
                                    <h3 className="font-serif text-2xl mb-2">{mat.title}</h3>
                                    {mat.description && (
                                        <p className="text-muted font-light leading-relaxed text-sm md:text-base">
                                            {mat.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Visual Gallery */}
            {gallery && gallery.length > 0 && (
                <section className="py-24 lg:py-32">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            {gallery.map((image: any, i: number) => (
                                <div
                                    key={image._key}
                                    className={`relative ${
                                        // Varied grid layout logic could go here, for now simple alternating or full width could work
                                        // Making every 3rd image full width for rhythm
                                        (i + 1) % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                                        } bg-surface overflow-hidden`}
                                >
                                    <Image
                                        src={urlFor(image.asset).width(1200).url()}
                                        alt={image.alt || `${title} detail ${i + 1}`}
                                        fill
                                        className="object-cover hover:scale-[1.02] transition-transform duration-1000"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
                                        blurDataURL={image.asset.metadata?.lqip}
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Related/Seen In Context */}
            {relatedProjects && relatedProjects.length > 0 && (
                <section className="py-24 border-t border-border">
                    <Container>
                        <h2 className="font-serif text-3xl text-center mb-16">Seen In Context</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((project: any) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* FAQs */}
            {relatedFAQs && relatedFAQs.length > 0 && (
                <section className="py-24 bg-surface/50">
                    <Container className="max-w-2xl mx-auto">
                        <h3 className="font-serif text-2xl text-center mb-12 italic text-muted">Details & Care</h3>
                        <div className="space-y-0">
                            {relatedFAQs.map((faq: any) => (
                                <FaqAccordion
                                    key={faq._id}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </article>
    );
}
