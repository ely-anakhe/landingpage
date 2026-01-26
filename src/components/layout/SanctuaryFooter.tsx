import Link from "next/link";
import { OpenInquiryButton } from "@/components/ui/OpenInquiryButton";

export function SanctuaryFooter() {
    return (
        <footer className="bg-foreground text-background py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h2 className="font-serif text-4xl md:text-5xl italic text-primary">
                        Curated Solitude.
                    </h2>
                    <p className="font-sans text-sm tracking-wide opacity-70 max-w-md leading-relaxed">
                        Anakhe invites you to explore spaces that breathe.
                        We do not sell products; we commission stories.
                    </p>
                    <div className="pt-8">
                        <OpenInquiryButton label="Begin a Conversation" variant="link" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm font-sans tracking-wide opacity-80">
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg italic text-primary opacity-100">Atelier</h3>
                        <ul className="space-y-2">
                            <li><Link href="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
                            <li><Link href="/stories" className="hover:text-primary transition-colors">Stories</Link></li>
                            <li><Link href="/philosophy" className="hover:text-primary transition-colors">Philosophy</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg italic text-primary opacity-100">Connect</h3>
                        <ul className="space-y-2">
                            <li><a href="mailto:jordan@anakhe.com" className="hover:text-primary transition-colors">jordan@anakhe.com</a></li>
                            <li><span className="opacity-50">BY APPOINTMENT ONLY</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-40 font-sans">
                <p>&copy; {new Date().getFullYear()} Anakhe by Jordan Anais.</p>
                <p>Designed as a Sanctuary.</p>
            </div>
        </footer>
    );
}
