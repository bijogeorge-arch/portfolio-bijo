// ─────────────────────────────────────────────────────────────
// Site-wide data & configuration
// Update these values with your real URLs and information.
// ─────────────────────────────────────────────────────────────

/** Developer identity & contact details */
export const DEVELOPER = {
    name: "Bijo George",
    title: "Full-Stack Developer & UI Engineer",
    // TODO: Replace with your actual email address
    email: "hello@yourdomain.com",
} as const;

// ─── Social Links ────────────────────────────────────────────

export interface SocialLink {
    label: string;
    /** URL — update with your real profile links */
    href: string;
    /** Lucide icon name (rendered by the consuming component) */
    iconName: "Linkedin" | "Github" | "Twitter" | "Mail";
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: "LinkedIn",
        // TODO: Replace with your actual LinkedIn profile URL
        href: "https://linkedin.com/in/yourprofile",
        iconName: "Linkedin",
    },
    {
        label: "GitHub",
        // TODO: Replace with your actual GitHub profile URL
        href: "https://github.com/yourprofile",
        iconName: "Github",
    },
    {
        label: "Twitter",
        // TODO: Replace with your actual Twitter/X profile URL
        href: "https://twitter.com/yourprofile",
        iconName: "Twitter",
    },
    {
        label: "Email",
        href: `mailto:hello@yourdomain.com`,
        iconName: "Mail",
    },
];

// ─── Projects ────────────────────────────────────────────────

export interface ProjectData {
    title: string;
    description: string;
    image?: string;
    gradient?: string;
    badges: string[];
    /** External live demo URL — leave undefined if not applicable */
    liveUrl?: string;
    /** GitHub repository URL — leave undefined if not applicable */
    githubUrl?: string;
    /** Optional category label shown above the title */
    label?: string;
}

export const FEATURED_PROJECTS: ProjectData[] = [
    {
        label: "Featured",
        title: "SaaS Analytics Dashboard",
        description:
            "A full-stack analytics platform with real-time data visualization, role-based access control, and automated reporting. Built for scale with edge caching and optimistic UI updates.",
        image: "/projects/analytics.png",
        badges: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "Redis"],
        // TODO: Replace with your actual live demo URL
        liveUrl: "https://your-analytics-demo.vercel.app",
        // TODO: Replace with your actual GitHub repo URL
        githubUrl: "https://github.com/yourusername/saas-analytics-dashboard",
    },
    {
        label: "E-Commerce",
        title: "Modern E-Commerce Platform",
        description:
            "A high-performance storefront with Stripe integration, inventory management, and a headless CMS. Features server-side rendering for SEO and progressive image loading.",
        image: "/projects/ecommerce.png",
        badges: ["Next.js", "Tailwind CSS", "Stripe", "Sanity CMS", "Vercel"],
        // TODO: Replace with your actual live demo URL
        liveUrl: "https://your-ecommerce-demo.vercel.app",
        // TODO: Replace with your actual GitHub repo URL
        githubUrl: "https://github.com/yourusername/modern-ecommerce",
    },
];

export const OTHER_PROJECTS: ProjectData[] = [
    {
        title: "Real-Time Collab Editor",
        description:
            "Multiplayer document editor with live cursors, comments, and version history. Uses CRDTs for conflict-free collaborative editing.",
        gradient:
            "bg-gradient-to-br from-chart-5/30 via-primary/20 to-chart-2/20 dark:from-chart-5/20 dark:via-primary/15 dark:to-chart-2/15",
        badges: ["React", "Y.js", "WebSocket", "Node.js", "MongoDB"],
        // TODO: Replace with your actual GitHub repo URL
        githubUrl: "https://github.com/yourusername/realtime-collab-editor",
    },
    {
        title: "Telegram-Style Portfolio",
        description:
            "This very portfolio you're viewing! A developer portfolio reimagined as a desktop messaging app with AI assistant integration, Lottie animations, and full theme support.",
        gradient:
            "bg-gradient-to-br from-primary/30 via-chart-1/20 to-chart-3/20 dark:from-primary/20 dark:via-chart-1/15 dark:to-chart-3/15",
        badges: ["Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "OpenRouter"],
        // TODO: Replace with your actual live demo URL
        liveUrl: "https://your-portfolio.vercel.app",
        // TODO: Replace with your actual GitHub repo URL
        githubUrl: "https://github.com/yourusername/telegram-portfolio",
    },
];
