import { NextRequest, NextResponse } from "next/server";

/**
 * Use the Edge runtime for minimal cold-starts on Netlify.
 * Edge functions boot in <50 ms vs ~250 ms for Node serverless.
 */
export const runtime = "edge";

const SYSTEM_PROMPT = `You are the personal AI assistant for a Senior Full-Stack Developer's portfolio website. Your tone is concise, professional, helpful, and non-verbose.

About the developer:
- Senior Full-Stack Developer & UI/UX Engineer with 5+ years of experience
- Currently a Senior Software Engineer at TechNova Solutions (2023-Present)
- Previously a Full-Stack Developer at Creative Dynamics (2020-2022)
- Core Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Node.js, Prisma, PostgreSQL, Docker
- Additional Skills: System Design, UI/UX Design, Framer Motion, CI/CD, Git
- Education: BSc in Computer Science
- Languages: English (Native), Spanish (Basic)
- Passionate about building modular, performant, and visually stunning web applications
- Currently exploring the intersection of AI and frontend development
- Available for new opportunities and freelance projects

Key achievements:
- Architected a high-traffic SaaS platform using Next.js and Microservices
- Led a team of 5 developers, improving code quality and deployment efficiency by 40%
- Built custom CMS solutions for enterprise clients
- Optimized database queries, reducing response times by 50%

Answer questions about their tech stack, projects, skills, background, and availability. Do NOT break character or invent information beyond what is provided above. Keep responses concise (2-4 sentences max unless more detail is explicitly requested).`;

/** Maximum time (ms) to wait for OpenRouter before aborting. */
const REQUEST_TIMEOUT_MS = 15_000;

/** Free open-source models — tried in order of preference. */
const FREE_MODELS = ["upstage/solar-pro-3:free"] as const;

/** Strongly-typed shape of an incoming chat message. */
interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

/** Shape of the OpenRouter /chat/completions response we consume. */
interface OpenRouterResponse {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string };
}

export async function POST(req: NextRequest) {
    try {
        const body: { messages?: ChatMessage[] } = await req.json();

        if (!body.messages || !Array.isArray(body.messages)) {
            return NextResponse.json(
                { error: "Messages array is required" },
                { status: 400 },
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                {
                    error:
                        "OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in your environment variables.",
                },
                { status: 500 },
            );
        }

        let lastError: string | null = null;

        for (const model of FREE_MODELS) {
            try {
                // AbortController enforces a hard timeout so the edge
                // function never hangs if OpenRouter is slow.
                const controller = new AbortController();
                const timeout = setTimeout(
                    () => controller.abort(),
                    REQUEST_TIMEOUT_MS,
                );

                const response = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                            "Content-Type": "application/json",
                            "HTTP-Referer":
                                process.env.NEXT_PUBLIC_SITE_URL ??
                                "https://localhost:3000",
                            "X-Title": "Developer Portfolio AI Assistant",
                        },
                        body: JSON.stringify({
                            model,
                            messages: [
                                { role: "system", content: SYSTEM_PROMPT },
                                ...body.messages,
                            ],
                            max_tokens: 500,
                            temperature: 0.7,
                        }),
                        signal: controller.signal,
                    },
                );

                clearTimeout(timeout);

                if (!response.ok) {
                    const errorText = await response.text();
                    lastError = `${model}: HTTP ${response.status} – ${errorText}`;
                    console.warn(`Model ${model} failed: ${lastError}`);
                    continue;
                }

                const data: OpenRouterResponse = await response.json();

                if (data.error?.message) {
                    lastError = `${model}: ${data.error.message}`;
                    console.warn(`Model ${model} returned error: ${lastError}`);
                    continue;
                }

                const reply =
                    data.choices?.[0]?.message?.content ||
                    "I couldn't generate a response. Please try again.";

                return NextResponse.json({ reply });
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : "Unknown error";
                lastError = `${model}: ${message}`;
                console.warn(`Model ${model} failed, trying next...`, message);
                continue;
            }
        }

        return NextResponse.json(
            {
                error: `Failed to get AI response: ${lastError ?? "All models unavailable"}`,
            },
            { status: 502 },
        );
    } catch (error: unknown) {
        console.error("OpenRouter API error:", error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : "An unexpected error occurred";

        return NextResponse.json(
            { error: `Failed to get AI response: ${errorMessage}` },
            { status: 500 },
        );
    }
}
