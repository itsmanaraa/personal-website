"use client"

import { motion } from "framer-motion"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { ArrowDown } from "lucide-react"

import Link from "next/link"

export function Hero({ name, role, subRole, greeting, lastName }: { name: string, role: string, subRole: string, greeting: string, lastName: string }) {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="text-center pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6"
                >
                    <span className="font-mono text-sm md:text-base text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                        {greeting}
                    </span>
                </motion.div>
                <motion.h1
                    className="text-6xl md:text-9xl font-bold tracking-tighter mb-2 text-foreground"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {name}
                </motion.h1>
                <motion.h2
                    className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-muted"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    {lastName}
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="overflow-hidden flex flex-col items-center gap-4"
                >
                    <p className="text-xl md:text-2xl font-light tracking-wide text-balance">
                        {role}
                    </p>
                    <p className="font-mono text-sm text-accent/80 tracking-widest">
                        {subRole}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-12 flex justify-center"
                >
                    <MagneticButton>
                        <Link href="/projects" className="group relative flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-background transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                            <span className="relative z-10 text-sm font-medium uppercase tracking-wider">Explore Work</span>
                            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </Link>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    )
}
