"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Download, Mail, MapPin, Globe, Briefcase, GraduationCap, Cpu, Zap, Target, Code2 } from "lucide-react"
import { useState } from "react"

import resumeData from "@/data/resume.json"

type ViewMode = 'standard' | 'technical' | 'founder'

export default function ResumePage() {
    const [viewMode, setViewMode] = useState<ViewMode>('standard')
    const data = resumeData
    const { experience, education, skills } = data

    const viewModes = [
        { id: 'standard', label: 'Standard', icon: Briefcase, color: 'text-accent' },
        { id: 'technical', label: 'Technical', icon: Code2, color: 'text-blue-400' },
        { id: 'founder', label: 'Founder', icon: Zap, color: 'text-amber-400' },
    ]

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-8 bg-background">
            <div className="mx-auto max-w-4xl">
                {/* View Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="flex p-1 rounded-full glass-light dark:glass-dark border border-border">
                        {viewModes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id as ViewMode)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${viewMode === mode.id
                                        ? 'bg-foreground text-background shadow-lg'
                                        : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                <mode.icon className={`w-4 h-4 ${viewMode === mode.id ? 'text-inherit' : mode.color}`} />
                                {mode.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Header */}
                <header className="mb-16">
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-foreground mb-4">
                                    Manara <span className="text-muted">Naqvi</span>
                                </h1>
                                <p className="text-xl text-muted max-w-2xl mb-8 leading-relaxed">
                                    {viewMode === 'technical' && "Deep-tech engineer specializing in low-latency systems, distributed architecture, and AI infrastructure."}
                                    {viewMode === 'founder' && "Strategic builder focused on high-impact products, scaling technical teams, and bridging engineering with market needs."}
                                    {viewMode === 'standard' && "Architecting high-performance systems and intelligent interfaces. Bridging the gap between quantitative finance and creative engineering."}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-muted mb-8">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{data.settings?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{data.settings?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        <span>manara.ai</span>
                                    </div>
                                </div>

                                <a
                                    href={data.settings?.resumePdf || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium transition-all hover:scale-105 shadow-lg"
                                >
                                    <Download className="w-4 h-4" />
                                    Download {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} CV
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Experience */}
                <section className="mb-20">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-8 text-foreground">
                        <Briefcase className="w-6 h-6 text-accent" />
                        Professional Evolution
                    </h2>

                    <div className="space-y-12">
                        {experience?.map((job: any, index: number) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 border-l border-border last:border-0"
                            >
                                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background" />

                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-foreground">{job.role}</h3>
                                    <span className="font-mono text-sm text-muted">{job.period}</span>
                                </div>

                                <div className="text-lg text-accent/80 mb-4">{job.company}</div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={viewMode}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="text-muted mb-4 leading-relaxed">
                                            {viewMode === 'standard' ? job.description : (job.viewModes?.[viewMode]?.emphasis === 'impact' ? `Focused on ${job.viewModes[viewMode].highlight.join(', ')}.` : job.description)}
                                        </p>

                                        {job.viewModes?.[viewMode] && (
                                            <div className="mb-4 flex flex-wrap gap-2">
                                                {job.viewModes[viewMode].highlight.map((h: string) => (
                                                    <span key={h} className="flex items-center gap-1 text-sm font-medium text-foreground">
                                                        <Target className="w-3 h-3 text-accent" />
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill: string) => (
                                        <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-surface border border-border text-muted">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-20">
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-8 text-foreground">
                        <Cpu className="w-6 h-6 text-accent" />
                        Technical Arsenal
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {skills?.map((category: any) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-colors"
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-4">{category.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.items.map((item: string) => (
                                        <span
                                            key={item}
                                            className={`px-3 py-1.5 text-sm rounded-md border transition-all cursor-default ${viewMode === 'technical' && category.cluster === 'core'
                                                    ? 'bg-accent/10 border-accent/30 text-accent-dark'
                                                    : 'bg-background border-border text-muted hover:text-foreground'
                                                }`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="flex items-center gap-3 text-2xl font-bold mb-8 text-foreground">
                        <GraduationCap className="w-6 h-6 text-accent" />
                        Foundation
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {education?.map((edu: any) => (
                            <div key={edu.id} className="p-6 rounded-2xl bg-surface border border-border">
                                <h3 className="text-lg font-semibold text-foreground mb-1">{edu.school}</h3>
                                <div className="text-accent/80 mb-2">{edu.degree}</div>
                                <div className="text-sm text-muted mb-4">{edu.period}</div>
                                <p className="text-sm text-muted/80 leading-relaxed">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

