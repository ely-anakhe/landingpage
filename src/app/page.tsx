import { HeroCarousel } from "@/components/home/HeroCarousel";
import { LatestProjects } from "@/components/home/LatestProjects";
import { AtelierSection } from "@/components/home/AtelierSection";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { ArtistShowcase } from "@/components/home/ArtistShowcase";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { client, urlFor } from "@/sanity/lib/client";
import { SETTINGS_QUERY, LATEST_PROJECTS_QUERY, FEATURED_PIECES_QUERY } from "@/sanity/lib/queries";

// export const revalidate = 60;

export default async function Home() {
  const settings = await client.fetch(SETTINGS_QUERY);
  const latestProjects = await client.fetch(LATEST_PROJECTS_QUERY);
  const featuredPieces = await client.fetch(FEATURED_PIECES_QUERY);
  const heroContent = settings?.heroContent || [];

  return (
    <div className="space-y-0 pb-0">
      <HeroCarousel content={heroContent} />

      <PhilosophySection image={settings?.philosophyImage} />

      <LatestProjects projects={latestProjects} />

      <AtelierSection pieces={featuredPieces} />

      <div className="w-full flex justify-center bg-surface py-0">
        <div className="w-16 h-px bg-border/20" />
      </div>

      <MaterialsSection image={settings?.materialsImage} />

      <ArtistShowcase image={settings?.artistImage} />

    </div>
  );
}
