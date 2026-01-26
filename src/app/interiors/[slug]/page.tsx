import { client, urlFor } from "@/sanity/lib/client";
import { PROJECT_DETAIL_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/interiors/Gallery";

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

    const { title, location, year, description, heroImage, gallery } = project;

    return (
        <article>
            {/* Hero */}
            <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-surface">
                {heroImage && (
                    <Image
                        src={urlFor(heroImage).url()}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>

            <Container className="py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Header / Meta */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <h1 className="font-serif text-5xl md:text-6xl text-text-main leading-none mb-6">
                            {title}
                        </h1>
                        <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-widest text-muted">
                            {location && <span>{location}</span>}
                            {year && <span>{year}</span>}
                        </div>
                    </div>

                    {/* Story */}
                    <div className="lg:col-span-8 lg:col-start-6">
                        {description && (
                            <div className="prose prose-lg prose-p:font-sans prose-p:text-text-main/80 prose-headings:font-serif prose-headings:font-normal max-w-none">
                                <PortableText value={description} components={components} />
                            </div>
                        )}

                        {/* Gallery */}
                        {gallery && gallery.length > 0 && <Gallery images={gallery} />}
                    </div>
                </div>
            </Container>
        </article>
    );
}
