"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface GalleryProps {
    images: any[];
    projectTitle?: string;
}

const getPositionClass = (position?: string) => {
    switch (position) {
        case "top-left":
            return "top-6 left-6";
        case "top-right":
            return "top-6 right-6";
        case "bottom-left":
            return "bottom-6 left-6";
        case "center":
            return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
        case "bottom-right":
        default:
            return "bottom-6 right-6";
    }
};

export function Gallery({ images, projectTitle }: GalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            {images.map((image, index) => (
                <div key={image._key || index} className="relative aspect-[4/5] bg-surface group overflow-hidden">
                    <Image
                        src={urlFor(image).width(1200).url()}
                        alt={image.alt || (projectTitle ? `${projectTitle} - Gallery Image ${index + 1}` : `Gallery Image ${index + 1}`)}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Handwritten Note Overlay */}
                    {image.curatorNote && (
                        <div className={`absolute ${getPositionClass(image.notePosition)} z-10 max-w-[200px] pointer-events-none`}>
                            <p className="font-handwriting text-white text-2xl -rotate-2 drop-shadow-md select-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {image.curatorNote}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
