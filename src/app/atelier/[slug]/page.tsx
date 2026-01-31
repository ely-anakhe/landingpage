import { client, urlFor } from "@/sanity/lib/client";
import { PIECE_DETAIL_QUERY, ATELIER_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";
import { PageNavigation } from "@/components/ui/PageNavigation";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ProjectCard } from "@/components/interiors/ProjectCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { DimensionsSection } from "@/components/atelier/DimensionsSection";

// export const revalidate = 60;

export async function generateStaticParams() {
    const pieces = await client.fetch(ATELIER_QUERY);
    return pieces.map((piece: any) => ({
        slug: piece.slug.current,
    }));
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-4 text-lg md:text-xl font-light leading-relaxed font-serif">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-serif mb-6 mt-12 font-normal">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-serif mb-4 mt-8 font-normal italic">{children}</h3>,
        blockquote: ({ children }: any) => <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-xl md:text-2xl font-serif opacity-80">{children}</blockquote>,
    },
    marks: {
        serif: ({ children }: { children: React.ReactNode }) => (
            <span className="font-serif italic text-primary">{children}</span>
        ),
    },
};

interface FeatureSectionProps {
    title?: string;
    description?: any;
    image?: any;
    layout?: "left" | "right";
    className?: string;
}

function FeatureSection({ title, description, image, layout = "left", className = "" }: FeatureSectionProps) {
    if (!description && !image) return null;

    return (
        <section className={`py-16 md:py-32 ${className}`}>
            <Container>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${layout === "right" ? "lg:grid-flow-dense" : ""}`}>
                    {/* Image Column */}
                    <div className={`relative aspect-[4/5] w-full overflow-hidden ${layout === "right" ? "lg:col-start-2" : ""}`}>
                        {image && (
                            <Image
                                src={urlFor(image).width(1200).url()}
                                alt={title || "Feature image"}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                placeholder={image.metadata?.lqip ? "blur" : "empty"}
                                blurDataURL={image.metadata?.lqip}
                            />
                        )}
                    </div>

                    {/* Content Column */}
                    <div className={`${layout === "right" ? "lg:col-start-1" : ""}`}>
                        {title && <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 font-normal">{title}</h2>}
                        {description && (
                            <div className="prose prose-lg max-w-none prose-p:font-serif prose-headings:font-serif">
                                <PortableText value={description} components={portableTextComponents} />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
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
        materialsSection,
        craftsmanshipSection,
        dimensionsSection,
        sizeVariants,
        mainImage,
        relatedProjects,
        relatedFAQs,
        video,
        gallery,
        neighbors
    } = piece;

    const currentIndex = neighbors?.findIndex((n: any) => n.slug === slug) ?? -1;
    const prev = currentIndex > 0 ? neighbors[currentIndex - 1] : null;
    const next = currentIndex < (neighbors?.length ?? 0) - 1 ? neighbors[currentIndex + 1] : null;

    // Split gallery for triptych if enough images
    const triptychImages = gallery && gallery.length >= 3 ? gallery.slice(0, 3) : null;
    const remainingGallery = gallery && gallery.length > 3 ? gallery.slice(3) : (gallery && gallery.length < 3 ? gallery : []);

    return (
        <article className="min-h-screen bg-background text-text-main overflow-hidden">
            {/* ===== 1. HERO SECTION ===== */}
            <section className="relative h-[85vh] w-full bg-surface overflow-hidden">
                {video ? (
                    <VideoPlayer playbackId={video.playbackId} className="w-full h-full absolute inset-0 object-cover" />
                ) : mainImage ? (
                    <Image
                        src={urlFor(mainImage).width(2000).url()}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                        placeholder={mainImage.metadata?.lqip ? "blur" : "empty"}
                        blurDataURL={mainImage.metadata?.lqip}
                    />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                    <div>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-sm font-normal">
                            {title}
                        </h1>
                        {priceDisplay && (
                            <p className="font-serif italic text-2xl md:text-3xl text-white/90 font-light">
                                {priceDisplay}
                            </p>
                        )}
                    </div>
                    <OpenInquiryButton
                        label="Inquire"
                        piece={{ title: piece.title, slug: piece.slug }}
                        variant="ghost"
                        className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-4 text-lg font-serif italic min-w-[200px]"
                    />
                </div>
            </section>

            {/* ===== 2. STORY / MANIFESTO (Large + Small Font) ===== */}
            <section className="py-24 md:py-32 bg-background">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        {story ? (
                            <div className="prose prose-2xl prose-p:font-serif prose-headings:font-serif mx-auto text-text-main">
                                <PortableText value={story} components={portableTextComponents} />
                            </div>
                        ) : shortDescription ? (
                            <>
                                {/* Extract first sentence as headline, rest as body */}
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8 text-text-main">
                                    {shortDescription.split('.')[0]}.
                                </h2>
                                {shortDescription.split('.').length > 1 && (
                                    <p className="font-serif text-xl md:text-2xl font-light leading-relaxed text-text-main/80">
                                        {shortDescription.split('.').slice(1).join('.').trim()}
                                    </p>
                                )}
                            </>
                        ) : null}
                    </div>
                </Container>
            </section>

            {/* ===== 3. TRIPTYCH GALLERY ===== */}
            {triptychImages && (
                <section className="pb-24">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {triptychImages.map((image: any, i: number) => (
                                <div key={image._key} className="relative aspect-[4/5] bg-surface overflow-hidden group">
                                    <Image
                                        src={urlFor(image).width(800).url()}
                                        alt={`Detail ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ===== 4. MATERIALS SECTION ===== */}
            <section className="py-16 md:py-32 bg-surface/30">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Image Column */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
                            {materialsSection?.image ? (
                                <Image
                                    src={urlFor(materialsSection.image).width(1200).url()}
                                    alt={materialsSection.heading || "Materials"}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    placeholder={materialsSection.image.metadata?.lqip ? "blur" : "empty"}
                                    blurDataURL={materialsSection.image.metadata?.lqip}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted font-serif italic text-xl">
                                    Materials Image
                                </div>
                            )}
                        </div>

                        {/* Content Column */}
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 font-normal">
                                {materialsSection?.heading || "Natural Materials"}
                            </h2>
                            {materialsSection?.description ? (
                                <div className="prose prose-lg max-w-none prose-p:font-serif prose-headings:font-serif">
                                    <PortableText value={materialsSection.description} components={portableTextComponents} />
                                </div>
                            ) : (
                                <p className="font-serif text-lg md:text-xl font-light leading-relaxed text-text-main/80">
                                    We source only the finest organic materials. Each element is chosen for its beauty, durability, and connection to nature.
                                </p>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== 5. SPECIFICATIONS SECTION (Off-White + Animation) ===== */}
            <section className="py-24 md:py-32 bg-background border-y border-border/30">
                <Container>
                    <DimensionsSection
                        heading={dimensionsSection?.heading || "Dimensions & Details"}
                        description={dimensionsSection?.description}
                        bespokeOptions={dimensionsSection?.bespokeOptions}
                        sizeVariants={sizeVariants?.map((variant: any) => ({
                            ...variant,
                            imageUrl: variant.diagram ? urlFor(variant.diagram).width(1200).url() : undefined
                        })) || []}
                    />
                </Container>
            </section>

            {/* ===== 6. CRAFTSMANSHIP SECTION ===== */}
            <section className="py-16 md:py-32 bg-background">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center lg:grid-flow-dense">
                        {/* Image Column */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface lg:col-start-2">
                            {craftsmanshipSection?.image ? (
                                <Image
                                    src={urlFor(craftsmanshipSection.image).width(1200).url()}
                                    alt={craftsmanshipSection.heading || "Craftsmanship"}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    placeholder={craftsmanshipSection.image.metadata?.lqip ? "blur" : "empty"}
                                    blurDataURL={craftsmanshipSection.image.metadata?.lqip}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted font-serif italic text-xl">
                                    Craftsmanship Image
                                </div>
                            )}
                        </div>

                        {/* Content Column */}
                        <div className="lg:col-start-1">
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 font-normal">
                                {craftsmanshipSection?.heading || "Artisan Craftsmanship"}
                            </h2>
                            {craftsmanshipSection?.description ? (
                                <div className="prose prose-lg max-w-none prose-p:font-serif prose-headings:font-serif">
                                    <PortableText value={craftsmanshipSection.description} components={portableTextComponents} />
                                </div>
                            ) : (
                                <p className="font-serif text-lg md:text-xl font-light leading-relaxed text-text-main/80">
                                    Every piece is handcrafted by skilled artisans. The human hand is the only machine we trust.
                                </p>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ===== 7. SEEN IN CONTEXT ===== */}
            {relatedProjects && relatedProjects.length > 0 && (
                <section className="py-24 bg-surface/20">
                    <Container>
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 font-normal">Seen In Context</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((project: any) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ===== 8. CTA SECTION ===== */}
            <section className="py-32 bg-primary/10 text-text-main text-center border-y border-border/30">
                <Container>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 font-normal">Does this belong in your space?</h2>
                    <p className="font-serif text-xl md:text-2xl font-light text-text-main/70 mb-12 max-w-2xl mx-auto">
                        Every piece is made to order. Begin your journey with a conversation.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <OpenInquiryButton
                            label="Start a Dialogue"
                            piece={{ title: piece.title, slug: piece.slug }}
                            className="bg-primary text-white hover:bg-primary-dark transition-all px-12 py-4 text-xl font-serif italic"
                        />
                    </div>
                </Container>
            </section>

            {/* ===== 9. FAQ SECTION ===== */}
            {relatedFAQs && relatedFAQs.length > 0 && (
                <section className="py-24 bg-background">
                    <Container>
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 font-normal">Common Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-0 border-t border-border">
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

            {/* ===== REMAINING GALLERY (if more than 3 images) ===== */}
            {remainingGallery && remainingGallery.length > 0 && (
                <section className="py-24 border-t border-border">
                    <Container>
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 font-normal">More Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {remainingGallery.map((image: any, i: number) => (
                                <div key={image._key} className="relative aspect-[4/3] bg-surface overflow-hidden group">
                                    <Image
                                        src={urlFor(image).width(1200).url()}
                                        alt={`Gallery ${i}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ===== NAVIGATION ===== */}
            <Container className="py-12 bg-background">
                <PageNavigation
                    prev={prev}
                    next={next}
                    basePath="/atelier"
                />
            </Container>

        </article>
    );
}
