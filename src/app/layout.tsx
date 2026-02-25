import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/context/animation-context";
import { LayoutDensityProvider } from "@/context/layout-density-context";
import { AIChatProvider } from "@/context/ai-chat-context";

// ── SEO & Open Graph ──────────────────────────────────────────
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bijovarghese.dev";

export const metadata: Metadata = {
  title: {
    default: "Bijo George | Full-Stack Developer Portfolio",
    template: "%s | Bijo George",
  },
  description:
    "Telegram-inspired developer portfolio of Bijo George — Full-Stack Developer & UI Engineer. Explore projects, skills, experience, and chat with an AI assistant.",
  keywords: [
    "Bijo George",
    "Full-Stack Developer",
    "UI Engineer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Developer Portfolio",
  ],
  authors: [{ name: "Bijo George" }],
  creator: "Bijo George",
  metadataBase: new URL(SITE_URL),

  // ── Open Graph ─────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bijo George — Developer Portfolio",
    title: "Bijo George | Full-Stack Developer Portfolio",
    description:
      "Telegram-inspired developer portfolio — projects, skills, and an AI assistant. Built with Next.js, Tailwind CSS, and Framer Motion.",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Bijo George — Full-Stack Developer Portfolio Preview",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Bijo George | Full-Stack Developer Portfolio",
    description:
      "Explore a Telegram-inspired developer portfolio with AI assistant integration.",
    images: ["/images/og-preview.jpg"],
    // Uncomment and update when you have a Twitter handle:
    // creator: "@yourhandle",
  },

  // ── Misc ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "color-scheme": "light dark",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit color-scheme meta for maximum browser compatibility */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            <LayoutDensityProvider>
              <AIChatProvider>
                {children}
              </AIChatProvider>
            </LayoutDensityProvider>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
