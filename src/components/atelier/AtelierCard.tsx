import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface PieceProps {
    _id: string;
    title: string;
    slug: { current: string };
    priceDisplay?: string;
    mainImage: any;
    shortDescription?: string;
}

export function AtelierCard({ piece }: { piece: PieceProps }) {
    const { title, slug, priceDisplay, mainImage } = piece;

    return (
        <Link href={`/atelier/${slug.current}`} className="group block mb-12">
            <div className="relative overflow-hidden aspect-[4/5] bg-surface">
                {mainImage && (
                    <Image
                        src={urlFor(mainImage).width(600).url()}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            <div className="mt-4 flex flex-col items-center text-center">
                <h3 className="font-serif text-xl text-text-main group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                {priceDisplay && (
                    <p className="font-sans text-xs uppercase tracking-widest text-muted mt-1">
                        {priceDisplay}
                    </p>
                )}
            </div>
        </Link>
    );
}
