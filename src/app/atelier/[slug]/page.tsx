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
import { PageNavigation } from "@/components/ui/PageNavigation";

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

    // ...

    // ... inside function
    // ... inside function
    const { title, priceDisplay, shortDescription, mainImage, specifications, bespokeOptions, relatedProjects, relatedFAQs, video, neighbors } = piece;

    const currentIndex = neighbors?.findIndex((n: any) => n.slug === slug) ?? -1;
    const prev = currentIndex > 0 ? neighbors[currentIndex - 1] : null;
    const next = currentIndex < (neighbors?.length ?? 0) - 1 ? neighbors[currentIndex + 1] : null;

    return (
        <article className="min-h-screen relative">

            <Container className="py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative">

                    {/* Left Column: Image - Sticky on Desktop */}
                    <div className="md:col-span-6 lg:col-span-7 relative">
                        <div className="sticky top-32">
                            <div className="relative aspect-[4/5] bg-surface w-full overflow-hidden">
                                {video ? (
                                    <VideoPlayer playbackId={video.playbackId} className="w-full h-full absolute inset-0" />
                                ) : mainImage ? (
                                    <Image
                                        src={urlFor(mainImage).width(1000).url()}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col h-full pt-4">
                        <div className="mb-8">
                            <h1 className="font-serif text-4xl lg:text-5xl text-text-main mb-2">
                                {title}
                            </h1>
                            {priceDisplay && (
                                <p className="font-serif italic text-xl text-muted">
                                    {priceDisplay}
                                </p>
                            )}
                        </div>

                        <div className="prose font-serif prose-p:font-serif [&_p]:font-serif prose-p:font-light prose-p:text-text-main/80 mb-12">
                            <p>{shortDescription}</p>
                        </div>

                        <div className="mb-12">
                            <OpenInquiryButton
                                label="Inquire about this piece"
                                piece={{ title, slug }}
                                className="w-full text-center"
                            />
                        </div>

                        {/* Specs */}
                        <div className="mt-auto border-t border-border">
                            {specifications && specifications.length > 0 && (
                                <SpecAccordion title="Specifications" items={specifications} />
                            )}
                            {bespokeOptions && bespokeOptions.length > 0 && (
                                <SpecAccordion title="Bespoke Options" items={bespokeOptions} />
                            )}
                            <SpecAccordion title="Shipping & Delivery" content="White glove delivery available worldwide. Please inquire for a quote to your location." />
                        </div>

                        {/* Related FAQs */}
                        {relatedFAQs && relatedFAQs.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-border">
                                <h3 className="font-serif text-lg italic text-primary mb-4">Details & Care</h3>
                                <div className="space-y-0">
                                    {relatedFAQs.map((faq: any) => (
                                        <FaqAccordion
                                            key={faq._id}
                                            question={faq.question}
                                            answer={faq.answer}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Context / Related Projects */}
                {relatedProjects && relatedProjects.length > 0 && (
                    <div className="mt-32 border-t border-border pt-24">
                        <h2 className="font-serif text-3xl text-center mb-16">Seen In Context</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((project: any) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </div>
                )}

            </Container>
        </article>
    );
}
