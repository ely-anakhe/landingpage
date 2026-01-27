import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    year?: number;
    location?: string;
    heroImage: any;
    tags?: string[];
    curatorNote?: string;
}

export function LatestProjects({ projects }: { projects: Project[] }) {
    // Ensure we have at least 1 project, handle up to 3
    const [mainProject, ...secondaryProjects] = projects || [];

    // Need 3 projects for the full layout, but handle fewer gracefully
    const sideProjects = secondaryProjects.slice(0, 2);

    return (
        <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-x-12 gap-y-12">

                {/* Left Column: Text & Secondary Projects */}
                <div className="lg:col-span-4 lg:col-start-2 flex flex-col">

                    {/* Header Section */}
                    <div className="text-center lg:text-left mb-16 lg:mb-auto">
                        <h2 className="font-serif text-5xl lg:text-6xl text-primary tracking-wide mb-8">
                            OUR PROJECTS
                        </h2>

                        <div className="flex justify-center lg:justify-start">
                            <Link
                                href="/interiors"
                                className="inline-block border-b border-primary/30 pb-1 font-serif text-xs tracking-[0.15em] uppercase text-text-main hover:text-primary hover:border-primary transition-all duration-300"
                            >
                                VIEW ALL PROJECTS
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Projects (Bottom Left) */}
                    <div className="grid grid-cols-1 gap-6 mt-auto">
                        {sideProjects.map((project) => (
                            <Link key={project._id} href={`/interiors/${project.slug.current}`} className="group block">
                                <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                                    {project.heroImage && (
                                        <Image
                                            src={urlFor(project.heroImage).width(800).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                        />
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column: Main Feature Project */}
                <div className="lg:col-span-5">
                    {mainProject && (
                        <Link href={`/interiors/${mainProject.slug.current}`} className="group block h-full">
                            <div className="relative w-full aspect-[4/5] min-h-[400px] overflow-hidden bg-surface">
                                {mainProject.heroImage && (
                                    <Image
                                        src={urlFor(mainProject.heroImage).width(1200).url()}
                                        alt={mainProject.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                    />
                                )}

                                {/* Curator Note Overlay if available */}
                                {mainProject.curatorNote && (
                                    <div className="absolute bottom-12 right-12 z-10 transform -rotate-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
                                        <span className="font-handwriting text-3xl text-white drop-shadow-md">
                                            {mainProject.curatorNote}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}
                </div>

            </div>
        </section>
    );
}
