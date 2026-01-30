import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <Container className="py-24 min-h-[60vh]">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                    Contact
                </h1>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                    Get in Touch
                </p>
            </header>

            <ContactForm />

            <div className="mt-24 text-center animate-in fade-in duration-700 delay-300 space-y-16">
                <div>
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted mb-6">
                        Or Email Us Directly
                    </p>
                    <a
                        href="mailto:contact@anakhe.com"
                        className="font-serif text-xl border-b border-black/20 pb-1 hover:text-primary hover:border-primary transition-all duration-300"
                    >
                        contact@anakhe.com
                    </a>
                </div>

                <div>
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted mb-6">
                        For Atelier Inquiries
                    </p>
                    <a
                        href="mailto:atelier@anakhe.com"
                        className="font-serif text-xl border-b border-black/20 pb-1 hover:text-primary hover:border-primary transition-all duration-300"
                    >
                        atelier@anakhe.com
                    </a>
                </div>
            </div>
        </Container>
    );
}
