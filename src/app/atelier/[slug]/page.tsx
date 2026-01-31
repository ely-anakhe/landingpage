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

// export const revalidate = 60;

export async function generateStaticParams() {
    const pieces = await client.fetch(ATELIER_QUERY);
    return pieces.map((piece: any) => ({
        slug: piece.slug.current,
    }));
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-4 text-lg md:text-xl font-light leading-relaxed text-text-main/80 font-serif">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-serif mb-6 mt-12 text-text-main font-normal">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-serif mb-4 mt-8 text-text-main font-normal italic">{children}</h3>,
        blockquote: ({ children }: any) => <blockquote className="border-l-2 border-primary pl-6 my-8 italic text-xl md:text-2xl text-text-main/70 font-serif">{children}</blockquote>,
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
                    <div className={`relative aspect-[4/5] bg-surface w-full overflow-hidden ${layout === "right" ? "lg:col-start-2" : ""}`}>
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
                        {title && <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 text-text-main font-normal">{title}</h2>}
                        {description && (
                            <div className="prose prose-lg max-w-none">
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
        mainImage,
        specifications,
        bespokeOptions,
        relatedProjects,
        relatedFAQs,
        video,
        gallery,
        neighbors
    } = piece;

    const currentIndex = neighbors?.findIndex((n: any) => n.slug === slug) ?? -1;
    const prev = currentIndex > 0 ? neighbors[currentIndex - 1] : null;
    const next = currentIndex < (neighbors?.length ?? 0) - 1 ? neighbors[currentIndex + 1] : null;

    return (
        <article className="min-h-screen bg-background text-text-main overflow-hidden pb-24">
            {/* Hero Section */}
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

                {/* Overlay Gradient */}
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
                        className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black transition-all px-8 py-4 text-lg font-serif italic min-w-[200px]"
                    />
                </div>
            </section>

            {/* Introduction / Story */}
            <section className="py-24 md:py-32 bg-background">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="prose prose-xl prose-p:font-serif prose-p:font-light prose-headings:font-serif mx-auto">
                            {story ? (
                                <PortableText value={story} components={portableTextComponents} />
                            ) : (
                                <p className="text-2xl md:text-3xl font-light leading-relaxed text-text-main/80 font-serif">
                                    {shortDescription}
                                </p>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Materials */}
            {materialsSection && (
                <FeatureSection
                    title={materialsSection.heading || "Materials"}
                    description={materialsSection.description}
                    image={materialsSection.image}
                    layout="left"
                    className="bg-surface/5"
                />
            )}

            {/* Craftsmanship */}
            {craftsmanshipSection && (
                <FeatureSection
                    title={craftsmanshipSection.heading || "Craftsmanship"}
                    description={craftsmanshipSection.description}
                    image={craftsmanshipSection.image}
                    layout="right"
                />
            )}

            {/* Dimensions & Specs */}
            <section className="py-24 md:py-32 bg-surface/10 border-t border-border/50">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        <div className="lg:col-span-5">
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-text-main font-normal">
                                {dimensionsSection?.heading || "Dimensions & Details"}
                            </h2>

                            {/* Structured Specs */}
                            <div className="space-y-12">
                                {specifications && specifications.length > 0 && (
                                    <div>
                                        <h3 className="font-serif text-xl italic text-primary mb-4 border-b border-border pb-2">Specifications</h3>
                                        <ul className="space-y-2 font-serif text-lg font-light text-text-main/80">
                                            {specifications.map((spec: string, i: number) => (
                                                <li key={i}>{spec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {bespokeOptions && bespokeOptions.length > 0 && (
                                    <div>
                                        <h3 className="font-serif text-xl italic text-primary mb-4 border-b border-border pb-2">Bespoke Options</h3>
                                        <ul className="space-y-2 font-serif text-lg font-light text-text-main/80">
                                            {bespokeOptions.map((opt: string, i: number) => (
                                                <li key={i}>{opt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <h3 className="font-serif text-xl italic text-primary mb-4 border-b border-border pb-2">Delivery</h3>
                                    <p className="font-serif text-lg font-light text-text-main/80">
                                        White glove delivery available worldwide. Each piece is made to order.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dimensions Diagram / Description */}
                        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
                            {dimensionsSection?.description && (
                                <div className="prose prose-lg mb-12">
                                    <PortableText value={dimensionsSection.description} components={portableTextComponents} />
                                </div>
                            )}
                            {dimensionsSection?.diagram && (
                                <div className="relative aspect-square w-full bg-white p-8">
                                    <Image
                                        src={urlFor(dimensionsSection.diagram).url()}
                                        alt="Dimensions Diagram"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Gallery Grid */}
            {gallery && gallery.length > 0 && (
                <section className="py-24">
                    <Container>
                        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16 font-normal">Detail Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gallery.map((image: any, i: number) => (
                                <div key={image._key} className="relative aspect-[4/3] bg-surface overflow-hidden group">
                                    <Image
                                        src={urlFor(image).width(1200).url()}
                                        alt={`Gallery image ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        placeholder={image.metadata?.lqip ? "blur" : "empty"}
                                        blurDataURL={image.metadata?.lqip}
                                    />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Related FAQs */}
            {relatedFAQs && relatedFAQs.length > 0 && (
                <section className="py-16 bg-surface/5">
                    <Container>
                        <h2 className="font-serif text-3xl text-center mb-12 font-normal">Common Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-0">
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

            {/* Related Projects Context */}
            {relatedProjects && relatedProjects.length > 0 && (
                <section className="py-24 border-t border-border">
                    <Container>
                        <h2 className="font-serif text-3xl text-center mb-16 font-normal">Seen In Context</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((project: any) => (
                                <ProjectCard key={project._id} project={project} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Navigation */}
            <Container className="pt-12">
                <PageNavigation
                    prev={prev}
                    next={next}
                    basePath="/atelier"
                />
            </Container>

        </article>
    );
}
