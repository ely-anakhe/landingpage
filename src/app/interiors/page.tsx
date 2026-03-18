import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries/interiors";
import { ProjectCard } from "@/components/interiors/ProjectCard";
import { Container } from "@/components/ui/Container";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Anakhe",
    description: "Archive of collected works by Anakhe.",
};

export default async function InteriorsPage() {
    const projects = await client.fetch(PROJECTS_QUERY);

    return (
        <Container className="py-24">
            <header className="mb-20 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main tracking-wide mb-2">
                    Archive of Works
                </h1>
                <p className="font-serif text-xs uppercase tracking-[0.2em] text-muted">
                    Selected Projects
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                {projects.map((project: any) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </Container >
    );
}
