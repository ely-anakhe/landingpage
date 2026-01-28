import { Container } from "@/components/ui/Container";


import { client } from "@/sanity/lib/client";
import { LEGAL_PAGE_QUERY } from "@/sanity/lib/queries";
import { LegalContent } from "@/components/ui/LegalContent";


export default async function PrivacyPage() {
    const page = await client.fetch(LEGAL_PAGE_QUERY, { slug: "privacy-policy" });

    if (page) {
        return (
            <Container className="py-24 min-h-[60vh]">
                <header className="mb-20 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                        {page.title}
                    </h1>
                    <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                        Last Updated: {new Date(page.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                </header>

                <div className="max-w-3xl mx-auto">
                    <LegalContent content={page.content} />
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-24 min-h-[60vh]">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                    Privacy Policy
                </h1>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                    Last Updated: January 28, 2026
                </p>
            </header>

            <div className="max-w-3xl mx-auto prose prose-p:font-serif prose-p:text-muted prose-headings:font-serif prose-headings:font-normal">
                <section className="mb-8">
                    <h3 className="text-xl mb-4">1. Introduction</h3>
                    <p>
                        Welcome to <strong>Anakhe Ltd</strong> ("Anakhe", "we", "us", or "our"). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we look after your personal data when you visit our website <strong>www.anakhe.com</strong> and tells you about your privacy rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">2. The Data We Collect</h3>
                    <p className="mb-4">We limit the data we collect to what is strictly necessary to provide our services.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Communication Data:</strong> When you use our "Inquiry" forms or subscribe to our newsletter, we collect your <strong>Name</strong> and <strong>Email Address</strong>, along with any information you choose to provide in your message.
                        </li>
                        <li>
                            <strong>Technical Data:</strong> As you navigate our site, we may automatically collect basic technical data (IP address, browser type, operating system) to ensure the site functions correctly.
                        </li>
                    </ul>
                </section>


                <section className="mb-8">
                    <h3 className="text-xl mb-4">3. Marketing and Communications</h3>
                    <p className="mb-4">
                        <strong>3.1. Lawful Basis for Processing:</strong> We process your personal data (specifically, your email address) for marketing purposes based on your explicit consent, which is obtained when you voluntarily subscribe to our newsletter via the website.
                    </p>
                    <p className="mb-4">
                        <strong>3.2. Third-Party Data Processors:</strong> We utilize Resend Inc. ("Resend") to manage our email subscriber lists and deliver communications. Resend is a third-party service provider based in the United States. By subscribing, you acknowledge and agree that your personal data will be transferred to, stored, and processed by Resend in accordance with their Privacy Policy and standard contractual clauses ensuring an adequate level of protection as required by the UK GDPR.
                    </p>
                    <p>
                        <strong>3.3. Withdrawal of Consent:</strong> You retain the right to withdraw your consent to marketing communications at any time. This can be exercised by clicking the "Unsubscribe" link provided in the footer of any email correspondence from us. Upon withdrawal, your data will be removed from our active marketing lists within a reasonable timeframe.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">4. How We Use Your Data</h3>
                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we use your data in the following circumstances:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>To Respond to Inquiries:</strong> To process the specific requests you submit regarding our furniture pieces or interior projects.</li>
                        <li><strong>To Send Newsletters:</strong> If you have opted-in, to send you our journal updates or atelier news. You can unsubscribe at any time.</li>
                        <li><strong>For Security & Performance:</strong> To maintain the security of our website and improve user experience.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">5. Third-Party Services (Our Infrastructure)</h3>
                    <p className="mb-4">We are a "Headless" digital atelier, meaning we use specialized, secure third-party providers to power our services. We do not sell your data. We share data only with the following trusted partners to function:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Vercel:</strong> Our hosting provider (delivers the website to your device).</li>
                        <li><strong>Sanity.io:</strong> Our content management system (stores text and images).</li>
                        <li><strong>Resend:</strong> Our email infrastructure (securely processes your inquiry forms and delivers them to our studio).</li>
                        <li><strong>Mux:</strong> Our video streaming partner (delivers the high-definition video textures).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">6. Cookies</h3>
                    <p>
                        We use a minimal number of cookies strictly necessary for the operation of the website. We do not use aggressive advertising trackers. You can set your browser to refuse all or some browser cookies, though this may affect the functionality of the site.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">7. Data Retention</h3>
                    <p>
                        We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">8. Your Legal Rights</h3>
                    <p>
                        Under data protection laws (GDPR), you have rights in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">9. Contact Us</h3>
                    <p className="mb-4">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                    <div className="pl-5 border-l-2 border-border/50">
                        <p className="font-bold">Anakhe Ltd</p>
                        <p>Woodbine Cottage, Tile Kiln Lane</p>
                        <p>UB9 6LU, United Kingdom</p>
                        <p>Company Number: 15737599</p>
                        <p>Email: <strong>contact@anakhe.com</strong></p>
                    </div>
                </section>
            </div>
        </Container>
    );
}

