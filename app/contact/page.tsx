"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Twitter, Send, MessageSquare } from "lucide-react"
import { useState } from "react"

import contactSettings from "@/data/contact.json"

export default function ContactPage() {
    const settings = contactSettings
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormState('submitting')

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch(e.currentTarget.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setFormState('success')
            } else {
                throw new Error('Submission failed')
            }
        } catch (err) {
            setFormState('idle')
            alert('Failed to send message. Please try again.')
        }
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-8 bg-background">
            <div className="mx-auto max-w-4xl">
                <div className="grid gap-16 md:grid-cols-[1fr_1.5fr]">
                    {/* Left: Intent & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-bold tracking-tighter text-foreground mb-8">
                            Let's Build.
                        </h1>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-muted hover:text-foreground transition-colors">
                                    <Mail className="w-5 h-5 text-accent" />
                                    <span>{settings?.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-muted">
                                    <MapPin className="w-5 h-5 text-accent" />
                                    <span>{settings?.location}</span>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                {settings?.socials && Object.entries(settings.socials).map(([platform, url]) => {
                                    const Icon = platform === 'github' ? Github : platform === 'linkedin' ? Linkedin : Twitter
                                    return (
                                        <a
                                            key={platform}
                                            href={url as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted hover:text-accent transition-all hover:scale-110"
                                        >
                                            <Icon className="w-6 h-6" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Direct Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form
                            action={`https://formsubmit.co/ajax/${settings?.formSubmitEmail}`}
                            method="POST"
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            {/* FormSubmit Configuration */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div className="grid gap-8 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="What's on your mind?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formState !== 'idle'}
                                className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-bold transition-all hover:scale-105 shadow-xl disabled:opacity-50"
                            >
                                {formState === 'idle' && (
                                    <>
                                        Send Transmission
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                                {formState === 'submitting' && 'Transmitting...'}
                                {formState === 'success' && 'Transmission Received.'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}

