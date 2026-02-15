import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface ProjectProps {
    _id: string;
    title: string;
    slug: { current: string };
    year?: number;
    location?: string;
    heroImage: any;
    tags?: string[];
    curatorNote?: string;
}

export function ProjectCard({ project }: { project: ProjectProps }) {
    const { title, slug, year, location, heroImage, curatorNote } = project;

    return (
        <Link href={`/interiors/${slug.current}`} className="group block break-inside-avoid mb-8">
            <div className="relative overflow-hidden bg-surface aspect-[3/4]">
                {heroImage && (
                    <Image
                        src={urlFor(heroImage).width(800).height(1067).fit("crop").url()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder={heroImage.metadata?.lqip ? "blur" : "empty"}
                        blurDataURL={heroImage.metadata?.lqip}
                    />
                )}
            </div>
            <div className="mt-4">
                <h3 className="font-serif text-2xl text-text-main group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                {location && year && (
                    <p className="font-serif text-xs uppercase tracking-widest text-muted mt-1 group-hover:text-primary/70 transition-colors duration-300">
                        {location} — {year}
                    </p>
                )}
            </div>
        </Link>
    );
}
