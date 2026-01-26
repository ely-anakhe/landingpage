import { Hero } from "@/components/layout/Hero";

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />

      {/* Placeholder for future sections (Scrollytelling "Stories" or "Pieces") */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="h-[600px] bg-neutral-200/50 rounded-sm" />
        <div className="space-y-8 p-8">
          <h3 className="font-serif text-4xl text-primary italic">The Philosophy of Silence.</h3>
          <p className="font-sans text-lg leading-relaxed opacity-80">
            In a world of noise, we design silence. Every piece is a sanctuary.
            Every room is a pause.
          </p>
        </div>
      </section>
    </div>
  );
}
