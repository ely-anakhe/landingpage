export interface Image {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface Piece {
    id: string;
    title: string;
    slug: string;
    collection: string;
    materials: string[];
    dimensions?: string;
    shortDescription: string;
    storyContext?: string; // The "Why" behind the piece
    images: Image[];
    isAvailable: boolean; // For internal logic, never shown as "Stock"
}

export interface Collection {
    id: string;
    title: string;
    description: string;
    slug: string;
    coverImage: Image;
}

export interface Story {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Placeholder for Portable Text
    moodImages: Image[]; // For the "atmosphere"
    relatedPieces: Piece[];
}

export type NavigationItem = {
    label: string;
    href: string;
};
