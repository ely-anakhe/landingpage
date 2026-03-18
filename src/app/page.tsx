import { HeroCarousel } from "@/components/home/HeroCarousel";
import { LatestProjects } from "@/components/home/LatestProjects";

import { ArtistShowcase } from "@/components/home/ArtistShowcase";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { client, urlFor } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries/settings";
import { LATEST_PROJECTS_QUERY, LATEST_PROJECTS_FALLBACK_QUERY } from "@/sanity/lib/queries/interiors";



export default async function Home() {
  const settings = await client.fetch(SETTINGS_QUERY);
  let latestProjects = await client.fetch(LATEST_PROJECTS_QUERY);

  // Fallback to latest projects by year if none are explicitly featured
  if (!latestProjects || latestProjects.length === 0) {
    latestProjects = await client.fetch(LATEST_PROJECTS_FALLBACK_QUERY);
  }

  const heroContent = settings?.heroContent || [];

  return (
    <div className="space-y-0 pb-0">
      <HeroCarousel content={heroContent} />

      <PhilosophySection image={settings?.philosophyImage} text={settings?.philosophyText} />

      <LatestProjects projects={latestProjects} />



      <div className="w-full flex justify-center bg-surface py-0">
        <div className="w-16 h-px bg-border/20" />
      </div>

      <ArtistShowcase image={settings?.artistImage} text={settings?.founderText} />

    </div>
  );
}
