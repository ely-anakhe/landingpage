import { client } from "@/sanity/lib/client";
import { GLOBAL_FAQ_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { type PortableTextBlock } from "sanity";

// export const revalidate = 60; // Revalidate every minute

interface FAQ {
    _id: string;
    question: string;
    answer: PortableTextBlock[];
    category: string;
}

export default async function CommonQuestionsPage() {
    const faqs = await client.fetch<FAQ[]>(GLOBAL_FAQ_QUERY);

    // Group FAQs by category
    const faqsByCategory = faqs.reduce((acc, faq) => {
        const category = faq.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(faq);
        return acc;
    }, {} as Record<string, FAQ[]>);

    // Define category order (optional, relying on query order mostly but good for explicit rendering if needed)
    // The query already orders by category asc, but we iterate over keys which might not be ordered.
    // Let's use the explicit categories list from the schema or just Object.keys sorted.
    // For now, Object.keys is sufficient as the backend query sort handles grouping consistency implicitly in list, 
    // but the grouped object keys iteration order is not guaranteed. 
    // To respect the query sort, we can iterate the original list and build unique categories, 
    // or just rely on the fixed categories array if we want specific order.
    // Let's just iterate the groups.

    const categories = Object.keys(faqsByCategory).sort();

    return (
        <div className="min-h-screen pt-12 md:pt-24 pb-24">
            <Container className="max-w-4xl">
                <div className="mb-16 md:mb-24 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main mb-6 italic">
                        Common Questions
                    </h1>
                    <p className="font-serif text-muted text-sm md:text-base tracking-wide max-w-lg mx-auto">
                        Details on ordering, delivery, and caring for your pieces.
                    </p>
                </div>

                <div className="space-y-16 md:space-y-24">
                    {categories.map((category) => (
                        <section key={category}>
                            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 border-b border-primary/20 pb-4">
                                {category}
                            </h2>
                            <div className="space-y-1">
                                {faqsByCategory[category].map((faq) => (
                                    <FaqAccordion
                                        key={faq._id}
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Container>
        </div>
    );
}
