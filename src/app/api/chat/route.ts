import { NextRequest, NextResponse } from "next/server";

/**
 * Use the Edge runtime for minimal cold-starts on Netlify.
 * Edge functions boot in <50 ms vs ~250 ms for Node serverless.
 */
export const runtime = "edge";

const SYSTEM_PROMPT = `You are the personal AI assistant for Bijo George's portfolio website. Your tone is concise, professional, helpful, and non-verbose.

About the developer:
- Frontend Developer with 1+ year of experience building responsive, high-performance web applications
- Currently pursuing Master of Computer Applications (MCA) at Modi Institute of Management and Technology (2024-2026, Grade: 8.0/10.0)
- Bachelor of Computer Applications (BCA) from Career Point University (2020-2023)
- Previous Role: Frontend Trainee at Spanco Web Technologies, Kota, Rajasthan (April 2023 - April 2024)
  - Built Shopify applications using Polaris components
  - Customized and optimized Shopify themes for improved UX and performance
  - Translated design references into functional, responsive UI components
- Internship: Lata Softwares, Kota (June-August 2022) — C# programming fundamentals
- Core Tech Stack: React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Material UI
- Additional Skills: Shopify/Polaris, Framer Motion, jQuery, Node.js, Git & GitHub
- Proficient in AI-assisted development using Cursor and advanced prompt engineering
- Key Project: Reliance Digital Clone — a full-featured e-commerce app built with React 19, Material UI, React Router v7, JWT auth, cart management, multi-step checkout, and infinite scroll
- Languages (spoken): English, Hindi, Malayalam
- Contact: bijogeorge9090@gmail.com | +91 7425886423
- Available for new opportunities and freelance projects

Answer questions about his tech stack, projects, skills, background, and availability. Do NOT break character or invent information beyond what is provided above. Keep responses concise (2-4 sentences max unless more detail is explicitly requested).`;

/** Maximum time (ms) to wait for OpenRouter before aborting. */
const REQUEST_TIMEOUT_MS = 15_000;

/** Free open-source models — tried in order of preference. */
const FREE_MODELS = [
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-3-4b-it:free",
    "google/gemma-3-12b-it:free",
    "nvidia/llama-3.1-nemotron-nano-12b-v1:free",
    "meta-llama/llama-4-scout:free",
    "qwen/qwen-2.5-72b-instruct:free",
] as const;

/** Patterns that indicate the model isn't providing a real answer. */
const REFUSAL_PATTERNS = [
    "unable to access",
    "technical issues",
    "currently unavailable",
    "i cannot assist",
    "please try again in a few minutes",
    "system is restored",
] as const;

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

// ── Local fallback knowledge base ──────────────────────────────────────────
// When OpenRouter is unavailable, we use keyword matching to give intelligent
// responses based on the developer's profile data.

interface FallbackEntry {
    keywords: string[];
    response: string;
}

const FALLBACK_RESPONSES: FallbackEntry[] = [
    {
        keywords: ["hello", "hi", "hey", "greet", "howdy", "sup"],
        response:
            "Hey there! 👋 I'm Bijo's AI assistant. I can tell you about his skills, projects, experience, education, or contact info. What would you like to know?",
    },
    {
        keywords: [
            "skill",
            "tech",
            "stack",
            "technology",
            "tools",
            "framework",
            "language",
            "programming",
        ],
        response:
            "Bijo's core tech stack includes **React.js**, **Next.js**, **JavaScript (ES6+)**, **TypeScript**, **HTML5**, **CSS3**, **Tailwind CSS**, and **Material UI**. He also works with Shopify/Polaris, Framer Motion, jQuery, Node.js, and Git & GitHub. He's proficient in AI-assisted development using Cursor and advanced prompt engineering.",
    },
    {
        keywords: ["project", "portfolio", "build", "built", "work", "reliance", "clone", "ecommerce"],
        response:
            "Bijo's key project is the **Reliance Digital Clone** — a full-featured e-commerce app built with React 19, Material UI, React Router v7, JWT authentication, cart management, multi-step checkout, and infinite scroll. He also built this Telegram-inspired portfolio website using Next.js and Tailwind CSS!",
    },
    {
        keywords: [
            "experience",
            "job",
            "company",
            "spanco",
            "trainee",
            "internship",
            "work history",
            "career",
        ],
        response:
            "Bijo worked as a **Frontend Trainee at Spanco Web Technologies** in Kota, Rajasthan (April 2023 – April 2024), where he built Shopify applications using Polaris components, customized themes for improved UX, and translated design references into functional, responsive UI. He also did an internship at **Lata Softwares** (June–August 2022), learning C# programming fundamentals.",
    },
    {
        keywords: [
            "education",
            "college",
            "university",
            "degree",
            "mca",
            "bca",
            "study",
            "qualification",
        ],
        response:
            "Bijo is currently pursuing his **MCA (Master of Computer Applications)** at Modi Institute of Management and Technology (2024–2026, Grade: 8.0/10.0). He completed his **BCA (Bachelor of Computer Applications)** from Career Point University (2020–2023).",
    },
    {
        keywords: ["contact", "email", "phone", "reach", "hire", "freelance", "available", "opportunity"],
        response:
            "You can reach Bijo at 📧 **bijogeorge9090@gmail.com** or 📱 **+91 7425886423**. He's currently available for new opportunities and freelance projects!",
    },
    {
        keywords: ["react", "nextjs", "next.js"],
        response:
            "Bijo is highly proficient in **React.js** and **Next.js**. He uses React 19 with modern patterns (hooks, context, server components) and has built production-grade applications including e-commerce platforms and this very portfolio website with Next.js.",
    },
    {
        keywords: ["shopify", "polaris", "theme", "ecommerce"],
        response:
            "During his time at Spanco Web Technologies, Bijo built **Shopify applications** using Polaris components, customized and optimized Shopify themes for improved UX and performance, and translated design references into functional, responsive UI components.",
    },
    {
        keywords: ["ai", "cursor", "prompt", "artificial intelligence"],
        response:
            "Bijo is proficient in **AI-assisted development** using tools like Cursor and advanced prompt engineering. He leverages AI to accelerate development workflows while maintaining high code quality — this portfolio itself was built with AI assistance!",
    },
    {
        keywords: ["language", "speak", "english", "hindi", "malayalam"],
        response:
            "Bijo speaks **English**, **Hindi**, and **Malayalam**.",
    },
    {
        keywords: ["who", "about", "tell me", "yourself", "introduce"],
        response:
            "Bijo George is a passionate **Frontend Developer** with 1+ year of experience building responsive, high-performance web applications. He specializes in React.js and Next.js, is currently pursuing his MCA, and is available for new opportunities and freelance projects.",
    },
    {
        keywords: ["resume", "cv", "download"],
        response:
            "You can download Bijo's resume directly from the portfolio! Look for the **📄 Download Resume** button on the Profile page, or click the download icon in the header.",
    },
];

const DEFAULT_FALLBACK =
    "I'm Bijo's portfolio assistant! I can help you learn about his **skills** (React, Next.js, Tailwind CSS…), **projects** (Reliance Digital Clone), **experience** (Spanco Web Technologies), **education** (MCA, BCA), or **contact info**. What interests you?";

function getLocalFallbackResponse(userMessage: string): string {
    const lower = userMessage.toLowerCase();

    // Score each fallback entry by how many keywords match
    let bestMatch: FallbackEntry | null = null;
    let bestScore = 0;

    for (const entry of FALLBACK_RESPONSES) {
        const score = entry.keywords.filter((kw) => lower.includes(kw)).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    return bestMatch ? bestMatch.response : DEFAULT_FALLBACK;
}

// ────────────────────────────────────────────────────────────────────────────

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

        // If no API key, use local fallback immediately
        if (!apiKey) {
            const lastUserMsg =
                [...body.messages].reverse().find((m) => m.role === "user")
                    ?.content ?? "";
            return NextResponse.json({
                reply: getLocalFallbackResponse(lastUserMsg),
                source: "local",
            });
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

                const reply = data.choices?.[0]?.message?.content?.trim();

                // Skip empty or whitespace-only responses
                if (!reply) {
                    lastError = `${model}: Empty response`;
                    console.warn(`Model ${model} returned empty response`);
                    continue;
                }

                // Check if the model returned a "refusal" disguised as a response
                const lowerReply = reply.toLowerCase();
                const isRefusal = REFUSAL_PATTERNS.some((p) =>
                    lowerReply.includes(p),
                );
                if (isRefusal) {
                    lastError = `${model}: Model returned a refusal response`;
                    console.warn(
                        `Model ${model} refused: ${reply.slice(0, 100)}`,
                    );
                    continue;
                }

                return NextResponse.json({ reply, source: "ai" });
            } catch (err: unknown) {
                const message =
                    err instanceof Error ? err.message : "Unknown error";
                lastError = `${model}: ${message}`;
                console.warn(`Model ${model} failed, trying next...`, message);
                continue;
            }
        }

        // ── All AI models failed → use local fallback ──────────────────
        console.warn(
            `All AI models failed (${lastError}). Using local fallback.`,
        );
        const lastUserMsg =
            [...body.messages].reverse().find((m) => m.role === "user")
                ?.content ?? "";
        return NextResponse.json({
            reply: getLocalFallbackResponse(lastUserMsg),
            source: "local-fallback",
        });
    } catch (error: unknown) {
        console.error("OpenRouter API error:", error);

        // Even on total failure, give a helpful response
        return NextResponse.json({
            reply: DEFAULT_FALLBACK,
            source: "error-fallback",
        });
    }
}
