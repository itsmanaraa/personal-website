"use client"

import { motion } from "framer-motion"

export function HomeContent({ homeContent }: { homeContent: any }) {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="space-y-32 py-20">
                {/* About Section */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="mb-12">
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-accent mb-4">
                            Background
                        </h2>
                        <div className="h-px w-full bg-border" />
                    </div>

                    <div className="grid gap-12 md:grid-cols-2 text-muted leading-relaxed">
                        <div className="space-y-6">
                            <p className="text-lg sm:text-xl font-light">
                                {homeContent.aboutText1}
                            </p>
                            <p className="text-lg sm:text-xl font-light">
                                {homeContent.aboutText2}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <p className="text-lg sm:text-xl font-light">
                                {homeContent.aboutText3}
                            </p>
                            <div className="pt-4">
                                <div className="h-1 w-20 bg-accent rounded-full mb-4"></div>
                                <p className="font-mono text-sm text-accent/80">
                                    {homeContent.footerRole}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Additional sections could go here with similar motion.section wrappers */}
            </div>
        </div>
    )
}
