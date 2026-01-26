import { client } from "@/sanity/lib/client";
import { ATELIER_QUERY } from "@/sanity/lib/queries";
import { AtelierCard } from "@/components/atelier/AtelierCard";
import { Container } from "@/components/ui/Container";

export const revalidate = 60;

export default async function AtelierPage() {
    const pieces = await client.fetch(ATELIER_QUERY);

    return (
        <Container className="py-24">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                    The Atelier
                </h1>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">
                    Furniture & Objects
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {pieces.map((piece: any) => (
                    <AtelierCard key={piece._id} piece={piece} />
                ))}
            </div>
        </Container>
    );
}
