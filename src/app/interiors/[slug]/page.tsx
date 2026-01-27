import { client, urlFor } from "@/sanity/lib/client";
import { PROJECT_DETAIL_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/interiors/Gallery";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { PageNavigation } from "@/components/ui/PageNavigation";

export const revalidate = 60;

// Portable Text Components
const components = {
    marks: {
        serif: ({ children }: { children: React.ReactNode }) => (
            <span className="font-serif italic text-primary">{children}</span>
        ),
    },
};

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await client.fetch(PROJECT_DETAIL_QUERY, { slug });

    if (!project) {
        notFound();
    }

    // ... imports

    // ... inside function
    // ... inside function
    const { title, location, year, description, heroImage, gallery, video, neighbors } = project;

    const currentIndex = neighbors?.findIndex((n: any) => n.slug === slug) ?? -1;
    const prev = currentIndex > 0 ? neighbors[currentIndex - 1] : null;
    const next = currentIndex < (neighbors?.length ?? 0) - 1 ? neighbors[currentIndex + 1] : null;

    return (
        <article className="relative">
            {/* Hero */}
            <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-surface">
                {video ? (
                    <VideoPlayer playbackId={video.playbackId} className="w-full h-full" />
                ) : heroImage ? (
                    <Image
                        src={urlFor(heroImage).url()}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : null}
            </div>

            <Container className="pt-24 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Header / Meta */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <h1 className="font-serif text-5xl md:text-6xl text-text-main leading-none mb-6">
                            {title}
                        </h1>
                        <div className="flex flex-col gap-2 font-serif text-xs uppercase tracking-widest text-muted">
                            {location && <span>{location}</span>}
                            {year && <span>{year}</span>}
                        </div>
                    </div>

                    {/* Story */}
                    <div className="lg:col-span-7 lg:col-start-6">
                        {description && (
                            <div className="prose prose-lg font-serif prose-p:font-serif [&_p]:font-serif prose-p:text-text-main/80 prose-headings:font-serif prose-headings:font-normal max-w-none">
                                <PortableText value={description} components={components} />
                            </div>
                        )}

                        {/* Gallery */}
                        {gallery && gallery.length > 0 && <Gallery images={gallery} />}
                    </div>
                </div>

                <PageNavigation
                    prev={prev}
                    next={next}
                    basePath="/interiors"
                    className="border-none mt-12 pt-0"
                />
            </Container>
        </article>
    );
}
