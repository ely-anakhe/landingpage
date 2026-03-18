"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface GalleryProps {
    images: any[];
    projectTitle?: string;
}

/* ── Single gallery image ─────────────────────────────── */
function GalleryImage({
    image,
    projectTitle,
    index,
    sizes,
    onOpen,
}: {
    image: any;
    projectTitle?: string;
    index: number;
    sizes: string;
    onOpen: () => void;
}) {
    const w = image.metadata?.dimensions?.width || image.asset?.metadata?.dimensions?.width || 800;
    const h = image.metadata?.dimensions?.height || image.asset?.metadata?.dimensions?.height || 600;

    return (
        <button
            type="button"
            onClick={onOpen}
            className="relative overflow-hidden bg-surface group block w-full text-left cursor-default"
        >
            <Image
                src={urlFor(image).width(1400).quality(85).url()}
                alt={
                    image.alt ||
                    (projectTitle
                        ? `${projectTitle} - Gallery Image ${index + 1}`
                        : `Gallery Image ${index + 1}`)
                }
                width={w}
                height={h}
                className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes={sizes}
                placeholder={image.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={image.metadata?.lqip}
            />
        </button>
    );
}

/* ── Build rows based on image dimensions ─ */
function buildRows(images: any[]): { images: any[]; originalIndices: number[] }[] {
    const rows: { images: any[]; originalIndices: number[] }[] = [];
    const used = new Set<number>();

    for (let i = 0; i < images.length; i++) {
        if (used.has(i)) continue;

        const img = images[i];
        const w = img.metadata?.dimensions?.width || img.asset?.metadata?.dimensions?.width || 800;
        const h = img.metadata?.dimensions?.height || img.asset?.metadata?.dimensions?.height || 600;
        const isLandscape = w > h;

        if (isLandscape) {
            rows.push({ images: [img], originalIndices: [i] });
            used.add(i);
        } else {
            // Look ahead for the next portrait to pair with
            let paired = false;
            for (let j = i + 1; j < images.length; j++) {
                if (used.has(j)) continue;

                const nextImg = images[j];
                const nextW = nextImg.metadata?.dimensions?.width || nextImg.asset?.metadata?.dimensions?.width || 800;
                const nextH = nextImg.metadata?.dimensions?.height || nextImg.asset?.metadata?.dimensions?.height || 600;
                const nextIsLandscape = nextW > nextH;

                if (!nextIsLandscape) {
                    rows.push({ images: [img, nextImg], originalIndices: [i, j] });
                    used.add(i);
                    used.add(j);
                    paired = true;
                    break;
                }
            }

            if (!paired) {
                // Render as single if no pair found
                rows.push({ images: [img], originalIndices: [i] });
                used.add(i);
            }
        }
    }

    return rows;
}

/* ── Gallery component ────────────────────────────────── */
export function Gallery({ images, projectTitle }: GalleryProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (openIndex !== null) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "";
            };
        }
    }, [openIndex]);

    if (!images || images.length === 0) return null;

    const rows = buildRows(images);

    return (
        <>
            {/* Grid */}
            <div className="space-y-4 mt-12">
                {rows.map((row, rowIndex) => {
                    const isSingle = row.images.length === 1;
                    let isSinglePortrait = false;
                    
                    if (isSingle) {
                        const img = row.images[0];
                        const w = img.metadata?.dimensions?.width || img.asset?.metadata?.dimensions?.width || 800;
                        const h = img.metadata?.dimensions?.height || img.asset?.metadata?.dimensions?.height || 600;
                        isSinglePortrait = w <= h;
                    }

                    return (
                        <div
                            key={rowIndex}
                            className={isSingle ? (isSinglePortrait ? "md:w-1/2 lg:w-5/12 mx-auto" : "") : "grid grid-cols-2 gap-4"}
                        >
                            {row.images.map((image, i) => (
                                <GalleryImage
                                    key={image._key || row.originalIndices[i]}
                                    image={image}
                                    projectTitle={projectTitle}
                                    index={row.originalIndices[i]}
                                    sizes={
                                        isSingle
                                            ? "(max-width: 768px) 100vw, 700px"
                                            : "(max-width: 768px) 100vw, 350px"
                                    }
                                    onOpen={() => setOpenIndex(row.originalIndices[i])}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Lightbox — portalled to body so it's always viewport-centered */}
            {openIndex !== null &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
                        onClick={() => setOpenIndex(null)}
                        style={{ margin: 0 }}
                    >
                        <Image
                            src={urlFor(images[openIndex]).width(2400).quality(90).url()}
                            alt={
                                images[openIndex].alt ||
                                (projectTitle
                                    ? `${projectTitle} - Gallery Image ${openIndex + 1}`
                                    : `Gallery Image ${openIndex + 1}`)
                            }
                            width={
                                images[openIndex].metadata?.dimensions?.width ||
                                images[openIndex].asset?.metadata?.dimensions?.width ||
                                1600
                            }
                            height={
                                images[openIndex].metadata?.dimensions?.height ||
                                images[openIndex].asset?.metadata?.dimensions?.height ||
                                1200
                            }
                            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>,
                    document.body
                )}
        </>
    );
}
