import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, Calendar, Tag, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { ProjectSummaryToggle } from "./ProjectSummaryToggle"
import { FadeUp, FadeIn } from "./ProjectAnimations"

interface ProjectCaseStudyProps {
    project: {
        frontmatter: {
            title: string
            category: string
            tags: string[]
            year: string
            summary: string
            technicalSummary: string
            tech: string[]
            links: {
                demo?: string
                github?: string
            }
        }
        rawContent: string
        slug: string
    }
}

const mdxComponents = {
    h1: (props: any) => (
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 mt-12" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 mt-10 border-b border-white/10 pb-2" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="text-2xl font-semibold text-foreground mb-3 mt-8" {...props} />
    ),
    h4: (props: any) => (
        <h4 className="text-xl font-semibold text-foreground/90 mb-2 mt-6" {...props} />
    ),
    p: (props: any) => (
        <p className="text-muted leading-relaxed mb-4" {...props} />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-muted" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-muted" {...props} />
    ),
    li: (props: any) => (
        <li className="leading-relaxed" {...props} />
    ),
    a: (props: any) => (
        <a className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors" {...props} />
    ),
    code: (props: any) => {
        const isInline = typeof props.children === 'string'
        if (isInline) {
            return (
                <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-sm text-accent" {...props} />
            )
        }
        return <code {...props} />
    },
    pre: (props: any) => (
        <pre className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto mb-6 border border-white/5" {...props} />
    ),
    table: (props: any) => (
        <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse" {...props} />
        </div>
    ),
    thead: (props: any) => (
        <thead className="bg-white/5 border-b border-white/10" {...props} />
    ),
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => (
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors" {...props} />
    ),
    th: (props: any) => (
        <th className="px-4 py-3 text-left font-semibold text-foreground text-sm" {...props} />
    ),
    td: (props: any) => (
        <td className="px-4 py-3 text-muted text-sm" {...props} />
    ),
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 py-2 my-6 italic text-muted/80 bg-accent/5" {...props} />
    ),
    hr: (props: any) => (
        <hr className="my-8 border-white/10" {...props} />
    ),
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
    const { frontmatter } = project

    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Back Button */}
            <div className="mx-auto max-w-4xl px-4 sm:px-8 mb-8">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Projects
                </Link>
            </div>

            {/* Header */}
            <header className="mx-auto max-w-4xl px-4 sm:px-8 mb-12">
                <FadeUp>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase">
                            {frontmatter.category}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted">
                            <Calendar className="w-4 h-4" />
                            {frontmatter.year}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                        {frontmatter.title}
                    </h1>

                    {/* AI Summary Toggle (Client Component) */}
                    <ProjectSummaryToggle
                        summary={frontmatter.summary}
                        technicalSummary={frontmatter.technicalSummary}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {frontmatter.tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-muted"
                            >
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {frontmatter.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-muted"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                        {frontmatter.links.github && (
                            <a
                                href={frontmatter.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm text-muted hover:text-foreground transition-all"
                            >
                                <Github className="w-4 h-4" />
                                View Code
                            </a>
                        )}
                        {frontmatter.links.demo && (
                            <a
                                href={frontmatter.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 text-sm text-accent transition-all"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </FadeUp>
            </header>

            {/* Content */}
            <article className="mx-auto max-w-4xl px-4 sm:px-8">
                <FadeIn delay={0.2}>
                    <div className="prose prose-invert max-w-none">
                        <MDXRemote source={project.rawContent} components={mdxComponents} />
                    </div>
                </FadeIn>
            </article>

            {/* Back to top */}
            <div className="mx-auto max-w-4xl px-4 sm:px-8 mt-16">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to All Projects
                </Link>
            </div>
        </main>
    )
}
