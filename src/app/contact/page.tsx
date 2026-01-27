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
        </Container>
    );
}
