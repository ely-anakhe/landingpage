import { Container } from "@/components/ui/Container";

export default function PressPage() {
    return (
        <Container className="py-24 min-h-[60vh]">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                    Press
                </h1>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                    Features & Publications
                </p>
            </header>

            <div className="max-w-2xl mx-auto text-center space-y-8">
                <p className="font-serif italic text-xl text-muted">
                    For press inquiries, image requests, and interviews, please contact us.
                </p>
                <div className="pt-8">
                    <a
                        href="mailto:press@anakhe.com"
                        className="inline-block border-b border-text-main pb-1 font-serif text-lg hover:text-primary hover:border-primary transition-colors"
                    >
                        press@anakhe.com
                    </a>
                </div>
            </div>
        </Container>
    );
}
