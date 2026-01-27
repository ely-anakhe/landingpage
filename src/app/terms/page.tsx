import { Container } from "@/components/ui/Container";

export default function TermsPage() {
    return (
        <Container className="py-24 min-h-[60vh]">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-2">
                    Terms of Service
                </h1>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                    Last Updated: January 27, 2026
                </p>
            </header>

            <div className="max-w-3xl mx-auto prose prose-p:font-serif prose-p:text-muted prose-headings:font-serif prose-headings:font-normal">
                <section className="mb-8">
                    <h3 className="text-xl mb-4">1. Introduction</h3>
                    <p className="mb-4">
                        These Terms of Service ("Terms") govern your access to and use of the website <strong>www.anakhe.com</strong> (the
                        "Site"), operated by <strong>Anakhe Ltd</strong> ("Anakhe", "we", "us", or "our"), a company registered in England and
                        Wales (Company Number: 15737599).
                    </p>
                    <p>
                        By accessing or using our Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not
                        access or use the Site.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">2. Nature of Our Services</h3>
                    <p className="mb-4">The Site serves as a digital atelier and portfolio.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>No Direct E-Commerce:</strong> The Site allows you to view our collection and submit inquiries for bespoke
                            furniture and interior design services. It does not currently facilitate direct online payments or "checkout"
                            transactions.
                        </li>
                        <li>
                            <strong>Inquiries:</strong> Submitting an inquiry form does not constitute a binding contract of sale. A contract is
                            only formed when we formally accept your commission via a separate written agreement or invoice.
                        </li>
                        <li>
                            <strong>Accuracy:</strong> We make every effort to display the colors, textures, and dimensions of our pieces
                            accurately. However, as our work involves natural materials (stone, wood, unlacquered brass) and bespoke
                            craftsmanship, slight variations may occur. Your screen settings may also affect how colors appear.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">3. Intellectual Property</h3>
                    <p className="mb-4">
                        The Site and its entire contents, features, and functionality (including but not limited to all text, photography,
                        video, designs, and software) are owned by Anakhe Ltd, its licensors, or other providers of such material and are
                        protected by United Kingdom and international copyright, trademark, and other intellectual property laws.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>License:</strong> You are granted a limited, non-exclusive, non-transferable license to access and use the
                            Site for personal, non-commercial use.
                        </li>
                        <li>
                            <strong>Prohibitions:</strong> You must not reproduce, distribute, modify, create derivative works of, publicly
                            display, or republish any of the material on our Site without our prior written permission.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">4. User Conduct</h3>
                    <p className="mb-4">You agree to use the Site only for lawful purposes. You agree not to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Use the Site in any way that violates any applicable local, national, or international law.</li>
                        <li>Submit false or misleading information through our inquiry forms.</li>
                        <li>Introduce any viruses, trojan horses, worms, or other material that is malicious or technologically harmful.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">5. Limitation of Liability</h3>
                    <p>
                        To the fullest extent provided by law, in no event will Anakhe Ltd, its affiliates, or their licensors, service
                        providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory,
                        arising out of or in connection with your use, or inability to use, the Site.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">6. Third-Party Links</h3>
                    <p>
                        The Site may contain links to third-party websites or services (e.g., social media platforms) that are not owned or
                        controlled by Anakhe. We have no control over, and assume no responsibility for, the content, privacy policies, or
                        practices of any third-party websites.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">7. Governing Law</h3>
                    <p>
                        These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation
                        (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of
                        England and Wales.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">8. Changes to These Terms</h3>
                    <p>
                        We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately
                        when we post them. Your continued use of the Site following the posting of revised Terms means that you accept and
                        agree to the changes.
                    </p>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl mb-4">9. Contact Information</h3>
                    <p className="mb-4">
                        This Site is operated by Anakhe Ltd. All feedback, comments, requests for technical support, and other communications
                        relating to the Site should be directed to:
                    </p>
                    <div className="pl-5 border-l-2 border-border/50">
                        <p className="font-bold">Anakhe Ltd</p>
                        <p>Woodbine Cottage, Tile Kiln Lane</p>
                        <p>UB9 6LU, United Kingdom</p>
                        <p>Email: <strong>contact@anakhe.com</strong></p>
                    </div>
                </section>
            </div>
        </Container>
    );
}
