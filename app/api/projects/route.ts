import { NextResponse } from 'next/server'
import { getAllProjects } from '@/lib/mdx'
import { summarizeProject } from '@/lib/ai'

export async function GET() {
    try {
        const projects = await getAllProjects()

        // In a real production environment, you'd cache these summaries
        // For this demo, we'll ensure each project has an AI-ready flag
        const enhancedProjects = await Promise.all(projects.map(async (p) => {
            if (!p) return null;
            return {
                ...p.frontmatter,
                slug: p.slug,
                aiEnhanced: true,
            }
        }))

        const filtered = enhancedProjects.filter(Boolean)

        return NextResponse.json(filtered)
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}
