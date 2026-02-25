// ─────────────────────────────────────────────────────────────
// Site-wide data & configuration
// Populated from Bijo George's resume.
// ─────────────────────────────────────────────────────────────

/** Developer identity & contact details */
export const DEVELOPER = {
    name: "Bijo George",
    title: "Frontend Developer & React Specialist",
    email: "bijogeorge9090@gmail.com",
    phone: "+917425886423",
} as const;

// ─── Social Links ────────────────────────────────────────────

export interface SocialLink {
    label: string;
    href: string;
    iconName: "Linkedin" | "Github" | "Twitter" | "Mail";
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/bijogeorge",
        iconName: "Linkedin",
    },
    {
        label: "GitHub",
        href: "https://github.com/bijogeorge-arch",
        iconName: "Github",
    },
    {
        label: "Twitter",
        href: "https://twitter.com/bijogeorge",
        iconName: "Twitter",
    },
    {
        label: "Email",
        href: "mailto:bijogeorge9090@gmail.com",
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
    liveUrl?: string;
    githubUrl?: string;
    label?: string;
}

export const FEATURED_PROJECTS: ProjectData[] = [
    {
        label: "Featured",
        title: "Reliance Digital Clone",
        description:
            "A full-featured, responsive e-commerce web application faithfully cloning the core functionality of Reliance Digital. Features include JWT authentication, product discovery with filtering & sorting, cart management, multi-step checkout, wishlist, product reviews, and infinite scroll — all built with React 19.",
        image: "/projects/reliance-digital.png",
        badges: ["React 19", "Material UI", "React Router v7", "Styled Components", "JWT", "REST API"],
        githubUrl: "https://github.com/bijogeorge-arch/reliance-digital-clone",
        liveUrl: "https://reliance-clonee.netlify.app/",
    },
    {
        label: "Portfolio",
        title: "Telegram-Style Portfolio",
        description:
            "This very portfolio you're viewing! A developer portfolio reimagined as a desktop messaging app with AI assistant integration, Framer Motion animations, Resend email integration, and full theme support.",
        image: "/projects/personal-portfolio.png",
        badges: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Resend"],
        githubUrl: "https://github.com/bijogeorge-arch/portfolio-bijo",
    },
];

export const OTHER_PROJECTS: ProjectData[] = [];
