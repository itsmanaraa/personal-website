/**
 * AI Utility for project summarization using Hugging Face Inference API.
 */

const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN;

export async function summarizeProject(content: string): Promise<string> {
    if (!HF_TOKEN) {
        console.warn("HUGGINGFACE_TOKEN is missing. Returning fallback summary.");
        return "This project demonstrates advanced engineering principles and technical depth in its respective field. (AI Summary Fallback)";
    }

    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: content.substring(0, 1000), // Limit input size
                parameters: {
                    max_length: 100,
                    min_length: 30,
                    do_sample: false,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HF API error: ${response.statusText}`);
        }

        const result = await response.json();
        return result[0]?.summary_text || "Failed to generate summary.";
    } catch (error) {
        console.error("Error summarizing project:", error);
        return "Error generating AI summary. Please check the full case study.";
    }
}
