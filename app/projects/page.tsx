"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Code, Cpu, FlaskConical } from "lucide-react"
import Link from "next/link"

const projects = [
    {
        id: 1,
        title: "Algorithmic Market Maker",
        category: "FinTech",
        tech: ["Python", "Rust", "Solidity"],
        summary: "HFT system processing 50k tps with sub-ms latency.",
        year: "2025",
    },
    {
        id: 2,
        title: "Neural Architecture Search",
        category: "AI / ML",
        tech: ["PyTorch", "CUDA"],
        summary: "Automated discovery of optimal CNN architectures for edge devices.",
        year: "2024",
    },
    {
        id: 3,
        title: "DeFi Governance Protocol",
        category: "Web3",
        tech: ["Solidity", "Next.js"],
        summary: "DAO tooling for quadratic voting and delegation markets.",
        year: "2024",
    },
    {
        id: 4,
        title: "Spatial Audio Engine",
        category: "Audio",
        tech: ["C++", "WebAssembly"],
        summary: "Real-time binaural rendering engine for web browsers.",
        year: "2023",
    },
]

const categories = ["All", "FinTech", "AI / ML", "Web3", "Audio"]

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All")

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter
    )

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-20 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter sm:text-6xl text-foreground">
                            Research Lab
                        </h1>
                        <p className="mt-4 max-w-md font-mono text-sm text-muted">
                            Selected works and experiments.
                            <br />
                            Focus: High-performance systems & Intelligence.
                        </p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase transition-colors ${filter === cat
                                        ? "border-accent bg-accent/10 text-accent"
                                        : "border-white/10 text-muted hover:border-white/30 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group relative flex h-[300px] flex-col justify-between rounded-xl border border-white/5 bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-surface"
                            >
                                <div>
                                    <div className="flex items-start justify-between">
                                        <span className="font-mono text-xs text-accent">
                                            {project.category}
                                        </span>
                                        <span className="font-mono text-xs text-muted">
                                            {project.year}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-muted line-clamp-3">
                                        {project.summary}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-[10px] text-muted/50 uppercase tracking-wider">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    )
}
