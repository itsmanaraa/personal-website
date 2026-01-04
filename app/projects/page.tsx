"use client"

import { useState, useRef, MouseEvent, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, Github, ExternalLink, Layers } from "lucide-react"
import Link from "next/link"

// We'll fetch the projects on the client side for simplicity in this demo, 
// but in a real app you'd use getStaticProps or a Server Component.
// Since this is a 'use client' file, we'll use a simple state.

const categories = ["All", "FinTech", "AI / ML", "Web3", "Audio", "Systems", "Creative"]

function ProjectCard({ project }: { project: any }) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <Link href={`/projects/${project.slug}`}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative flex h-[340px] flex-col justify-between rounded-xl border border-border bg-surface shadow-md hover:shadow-xl transition-all duration-300 hover:border-accent/30 cursor-pointer overflow-hidden"
            >
                {/* AI Badge */}
                {project.aiEnhanced && (
                    <div className="absolute top-4 right-4 z-20">
                        <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-1 backdrop-blur-md border border-accent/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">AI Enhanced</span>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent-dark border border-accent/20">
                            <Layers className="w-3 h-3" />
                            {project.category}
                        </span>
                        <span className="font-mono text-xs text-muted/60">
                            {project.year || '2025'}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-3">
                        {project.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed line-clamp-4">
                        {project.summary}
                    </p>
                </div>

                <div className="p-6 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tech?.map((t: string) => (
                            <span key={t} className="text-[10px] text-muted/50 uppercase tracking-wider font-mono">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                        <div className="flex gap-3">
                            <span
                                className="text-muted hover:text-foreground transition-colors cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); window.open(project.links?.github || '#', '_blank'); }}
                            >
                                <Github className="w-4 h-4" />
                            </span>
                            <span
                                className="text-muted hover:text-foreground transition-colors cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); window.open(project.links?.demo || '#', '_blank'); }}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-muted group-hover:text-accent transition-colors">
                            View Case Study
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All")
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {
        // In a real app, this would be a server component or useSWR
        // For this demo, we'll fetch from an API route we'll create or just use the mock data if fetch fails
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data)
                } else {
                    throw new Error('Data is not an array')
                }
            })
            .catch(() => {
                // Fallback to some default data if API not ready
                setProjects([
                    {
                        id: 1,
                        slug: "algorithmic-market-maker",
                        title: "Algorithmic Market Maker",
                        category: "FinTech",
                        tech: ["Rust", "Python", "Solidity", "DPDK"],
                        summary: "Built a high-frequency trading system processing 50k transactions per second with sub-millisecond latency.",
                        year: "2025",
                        aiEnhanced: true
                    },
                    {
                        id: 2,
                        slug: "neural-architecture-search",
                        title: "Neural Architecture Search",
                        category: "AI / ML",
                        tech: ["PyTorch", "CUDA", "Ray", "TensorRT"],
                        summary: "Automated discovery of optimal CNN architectures for edge devices using reinforcement learning.",
                        year: "2024",
                        aiEnhanced: true
                    }
                ])
            })
    }, [])

    const filteredProjects = (Array.isArray(projects) ? projects : []).filter(
        (p: any) => filter === "All" || p.category === filter
    )

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-8 perspective-1000 bg-background">
            <div className="mx-auto max-w-7xl">
                <header className="mb-20 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold uppercase tracking-tighter sm:text-6xl text-foreground">
                            Research Lab
                        </h1>
                        <p className="mt-4 max-w-md font-mono text-sm text-muted">
                            Selected works and experiments.
                            <br />
                            Focus: High-performance systems & Intelligence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-xs uppercase transition-all duration-300 ${filter === cat
                                    ? "border-accent bg-accent/10 text-accent"
                                    : "border-border text-muted hover:border-accent/30 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </header>

                <motion.div
                    layout
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project: any) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    )
}
