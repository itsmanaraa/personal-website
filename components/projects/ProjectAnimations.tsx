"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export function FadeUp({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    )
}

export function FadeIn({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    )
}
