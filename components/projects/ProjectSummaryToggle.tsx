"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface ProjectSummaryToggleProps {
    summary: string
    technicalSummary: string
}

export function ProjectSummaryToggle({ summary, technicalSummary }: ProjectSummaryToggleProps) {
    const [summaryMode, setSummaryMode] = useState<'full' | '30s' | 'technical'>('full')

    return (
        <div className="relative overflow-hidden bg-surface border border-border rounded-2xl p-8 mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Neural Processing Active</span>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">AI-Native Intelligence</h3>
                    <p className="text-xs text-muted">Automated synthesis of project impact and technical depth.</p>
                </div>
            </div>

            <div className="flex gap-2 mb-8 p-1 w-fit rounded-full bg-background/50 border border-border">
                <button
                    onClick={() => setSummaryMode('full')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${summaryMode === 'full'
                        ? 'bg-foreground text-background shadow-lg'
                        : 'text-muted hover:text-foreground'
                        }`}
                >
                    Full Detail
                </button>
                <button
                    onClick={() => setSummaryMode('30s')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${summaryMode === '30s'
                        ? 'bg-foreground text-background shadow-lg'
                        : 'text-muted hover:text-foreground'
                        }`}
                >
                    30s Summary
                </button>
                <button
                    onClick={() => setSummaryMode('technical')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${summaryMode === 'technical'
                        ? 'bg-foreground text-background shadow-lg'
                        : 'text-muted hover:text-foreground'
                        }`}
                >
                    Technical
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={summaryMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg text-muted leading-relaxed font-light"
                >
                    {summaryMode === '30s' && (
                        <div className="flex gap-4">
                            <div className="w-1 bg-accent/30 rounded-full" />
                            <p>{summary}</p>
                        </div>
                    )}
                    {summaryMode === 'technical' && (
                        <div className="flex gap-4">
                            <div className="w-1 bg-blue-500/30 rounded-full" />
                            <p className="font-mono text-sm">{technicalSummary}</p>
                        </div>
                    )}
                    {summaryMode === 'full' && (
                        <div className="flex items-center gap-2 text-accent">
                            <span className="text-sm font-medium">Deep-dive analysis available below</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                ↓
                            </motion.span>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
