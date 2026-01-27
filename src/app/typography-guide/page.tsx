export default function TypographyGuide() {
    return (
        <div className="max-w-3xl mx-auto py-20 px-8 space-y-12">
            <header className="space-y-4">
                <h1 className="text-5xl font-serif font-light">Typography Guide</h1>
                <p className="text-xl font-serif text-muted">A verification page for the Anakhe design system.</p>
            </header>

            <section className="space-y-8">
                <div className="space-y-2">
                    <p className="font-serif text-sm text-muted uppercase tracking-wider">Headings (Cormorant Garamond)</p>
                    <div className="space-y-6 border-b border-muted/20 pb-8">
                        <h1 className="font-serif text-5xl font-light">H1: Quiet Luxury (Light 300)</h1>
                        <h2 className="font-serif text-4xl font-normal">H2: The Sanctuary (Regular 400)</h2>
                        <h3 className="font-serif text-3xl font-semibold">H3: Interior Atelier (SemiBold 600)</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-serif text-sm text-muted uppercase tracking-wider">Body Text (Cormorant Garamond)</p>
                    <div className="space-y-4 max-w-xl">
                        <p className="font-serif text-base font-normal leading-relaxed">
                            <strong>Body Regular (400):</strong> The concept of "Quiet Luxury" is rooted in the appreciation of quality over quantity. It whispers rather than shouts. This text block simulates the reading experience for standard content, articles, and descriptions.
                        </p>
                        <p className="font-serif text-base font-bold leading-relaxed">
                            <strong>Body Bold (700):</strong> Important emphasis looks like this. We use 700 weight for strong emphasis.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-serif text-sm text-muted uppercase tracking-wider">Selection Test</p>
                    <div className="p-8 bg-white border border-muted/20">
                        <p className="font-serif text-2xl italic text-primary">
                            "Select this text to see the Maroon background and Off-White text color."
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
