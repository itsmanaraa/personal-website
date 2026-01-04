import { notFound } from "next/navigation"
import { getMDXContent } from "@/lib/mdx"
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy"

// Temporarily hardcode available slugs
const availableSlugs = [
    "algorithmic-market-maker",
    "neural-architecture-search",
    "defi-governance-protocol"
]

export async function generateStaticParams() {
    return availableSlugs.map((slug) => ({
        slug,
    }))
}

export default async function ProjectPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    if (!availableSlugs.includes(slug)) {
        notFound()
    }

    const project = await getMDXContent('projects', slug)

    if (!project) {
        notFound()
    }

    return <ProjectCaseStudy project={project as any} />
}
