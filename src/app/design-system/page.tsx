import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight, Check, Rocket } from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background text-text-main pb-24">
            <Section className="py-12">
                <Container className="space-y-16">
                    <header className="space-y-4 border-b border-border pb-8">
                        <h1 className="text-5xl font-serif font-light text-primary">
                            Quiet Luxury Design System
                        </h1>
                        <p className="text-xl font-serif text-muted max-w-2xl">
                            A verification audit for the Anakhe design primitives, typography,
                            and core component library.
                        </p>
                    </header>

                    {/* Typography */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-serif font-normal text-muted border-b border-border pb-2">
                            01. Typography (Cormorant Garamond)
                        </h2>
                        <div className="grid gap-8">
                            <div className="space-y-2">
                                <span className="text-xs text-muted uppercase tracking-wider font-serif">
                                    Display (Light 300)
                                </span>
                                <h1 className="text-6xl font-serif font-light">
                                    The Sanctuary Architecture
                                </h1>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-muted uppercase tracking-wider font-serif">
                                    Heading 2 (Regular 400)
                                </span>
                                <h2 className="text-5xl font-serif font-normal">
                                    Bespoke Interior Atelier
                                </h2>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-muted uppercase tracking-wider font-serif">
                                    Heading 3 (Medium 500)
                                </span>
                                <h3 className="text-4xl font-serif font-medium">
                                    Curated Living Spaces
                                </h3>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-muted uppercase tracking-wider font-serif">
                                    Heading 4 (SemiBold 600)
                                </span>
                                <h4 className="text-3xl font-serif font-semibold">
                                    Materials & Craftsmanship
                                </h4>
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs text-muted uppercase tracking-wider font-serif">
                                    Italic Styling
                                </span>
                                <p className="text-4xl font-serif italic text-primary">
                                    "Architecture should speak of its time and place, but yearn for
                                    timelessness."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-serif font-normal text-muted border-b border-border pb-2">
                            02. Color Palette
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Swatch name="Primary" color="bg-primary" hex="#800000" text="text-white" />
                            <Swatch name="Primary Dark" color="bg-primary-dark" hex="#4A0404" text="text-white" />
                            <Swatch name="Background" color="bg-background" hex="#FAF9F6" border />
                            <Swatch name="Surface" color="bg-surface" hex="#F5F5F0" />
                            <Swatch name="Text Main" color="bg-text-main" hex="#1A1A1A" text="text-white" />
                            <Swatch name="Border" color="bg-border" hex="#E5E5E5" />
                            <Swatch name="Muted" color="bg-muted" hex="#8C8C8C" text="text-white" />
                        </div>
                    </div>

                    {/* Components */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-serif font-normal text-muted border-b border-border pb-2">
                            03. UI Components
                        </h2>

                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Buttons */}
                            <div className="space-y-6">
                                <h3 className="font-serif font-medium text-lg">Buttons</h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button>Solid Button</Button>
                                    <Button variant="outline">Outline Button</Button>
                                    <Button variant="link">Link Button</Button>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button icon={<Rocket className="w-4 h-4" />}>
                                        With Icon
                                    </Button>
                                    <Button isLoading>Loading</Button>
                                    <Button disabled>Disabled</Button>
                                </div>
                            </div>

                            {/* Form Elements */}
                            <div className="space-y-6 max-w-md">
                                <h3 className="font-serif font-medium text-lg">Form Inputs</h3>
                                <div className="space-y-4">
                                    <Input placeholder="Enter your email address..." />
                                    <Input
                                        defaultValue="filled.value@example.com"
                                        className="text-primary"
                                    />
                                    <Textarea placeholder="Tell us about your project..." />
                                </div>
                            </div>

                            {/* Icons */}
                            <div className="space-y-6">
                                <h3 className="font-serif font-medium text-lg">Icons (Thin Stroke 1.5px)</h3>
                                <div className="flex gap-6 text-primary">
                                    <Icon icon={ArrowRight} />
                                    <Icon icon={Check} />
                                    <Icon icon={Rocket} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}

function Swatch({ name, color, hex, text = "text-text-main", border }: { name: string; color: string; hex: string; text?: string; border?: boolean }) {
    return (
        <div className="space-y-2">
            <div className={`h-24 w-full rounded-sm flex items-end p-3 ${color} ${text} ${border ? 'border border-border' : ''}`}>
                <span className="font-mono text-xs opacity-80">{hex}</span>
            </div>
            <p className="font-serif text-sm font-medium">{name}</p>
        </div>
    );
}
