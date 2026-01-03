"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
            <div className="z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted backdrop-blur-md">
                        Hello World
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-6 max-w-4xl font-sans text-5xl font-bold uppercase tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    Manara <br className="hidden sm:block" />
                    <span className="text-muted/50">Naqvi</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-8 max-w-lg text-center font-mono text-sm leading-relaxed text-muted sm:text-base"
                >
                    AI enthusiast
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                        Scroll to initialize
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="h-4 w-4 opacity-50" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
