import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { ProjectCard } from "@/components/interiors/ProjectCard";
import { Container } from "@/components/ui/Container";

export const revalidate = 60; // Revalidate every minute

export default async function InteriorsPage() {
    const projects = await client.fetch(PROJECTS_QUERY);

    return (
        <Container className="py-24">
            <header className="mb-20">
                <h1 className="font-serif text-4xl md:text-5xl text-text-main tracking-wide">
                    Selected Works
                </h1>
            </header>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {projects.map((project: any) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </Container>
    );
}
