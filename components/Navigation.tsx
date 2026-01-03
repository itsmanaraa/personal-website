"use client"

import { motion } from "framer-motion"
import { Home, Lightbulb, User, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: Lightbulb },
    { name: "Resume", href: "/resume", icon: User },
    { name: "Contact", href: "/contact", icon: Mail },
]

export function Navigation() {
    const pathname = usePathname()

    return (
        <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
            <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl saturate-150">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                                isActive ? "text-foreground" : "text-muted hover:text-foreground/80"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span className="hidden sm:inline">{item.name}</span>
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 z-0 rounded-full bg-white/10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}
