"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLayoutDensity } from "@/context/layout-density-context";
import { useAnimations } from "@/context/animation-context";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
    children: React.ReactNode;
    className?: string;
    /** If true, removes internal padding (used for image-topped bubbles) */
    noPadding?: boolean;
}

const bubbleVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: [0.21, 0.45, 0.32, 0.9]
        }
    }
};

const staticVariants: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
};

export function MessageBubble({ children, className, noPadding }: MessageBubbleProps) {
    const { density } = useLayoutDensity();
    const { animationsEnabled } = useAnimations();

    const isCompact = density === "compact";

    return (
        <motion.div
            variants={animationsEnabled ? bubbleVariants : staticVariants}
            className={cn(
                "max-w-[85%] md:max-w-[70%] mb-2 self-start",
                className
            )}
        >
            <div className="relative group">
                <div
                    className={cn(
                        "bg-card text-card-foreground shadow-sm",
                        "dark:bg-[#212D3B] dark:border-none",
                        noPadding
                            ? "rounded-2xl rounded-bl-[4px] overflow-hidden"
                            : isCompact
                                ? "px-3 py-2 rounded-xl rounded-bl-[3px]"
                                : "px-4 py-3 rounded-2xl rounded-bl-[4px]",
                        "border border-border/10",
                        "relative"
                    )}
                >
                    {children}

                    {/* Subtle tail */}
                    <div
                        className="absolute bottom-0 -left-1 w-2 h-2 bg-card dark:bg-[#212D3B] rounded-tr-full border-l border-b border-border/10 dark:border-none"
                        style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

/* ── Rich Media Sub-components ─────────────────────────────── */

/** Image thumbnail at the top of a bubble (Telegram-style attachment) */
export function MessageImage({
    src,
    alt,
    gradient,
    className
}: {
    src?: string;
    alt?: string;
    /** Fallback gradient if no image src provided */
    gradient?: string;
    className?: string;
}) {
    if (src) {
        return (
            <div className={cn("w-full aspect-[16/9] overflow-hidden rounded-t-2xl rounded-bl-none relative", className)}>
                <Image
                    src={src}
                    alt={alt || "Project thumbnail"}
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "w-full aspect-[16/9] overflow-hidden rounded-t-2xl rounded-bl-none",
                gradient || "bg-gradient-to-br from-primary/30 via-chart-5/20 to-chart-2/30",
                className
            )}
        >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
            </div>
        </div>
    );
}

/** Content area below an image inside a noPadding bubble */
export function MessageImageContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("px-4 py-3", className)}>
            {children}
        </div>
    );
}

/** Tech stack badge cluster */
export function MessageBadges({ badges }: { badges: string[] }) {
    return (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
            {badges.map((badge) => (
                <span
                    key={badge}
                    className="px-2 py-0.5 bg-primary/8 dark:bg-primary/12 text-primary text-[11px] font-medium rounded-md border border-primary/15 dark:border-primary/20"
                >
                    {badge}
                </span>
            ))}
        </div>
    );
}

/** Inline action buttons row (Telegram inline keyboard style) */
export function MessageInlineActions({
    actions,
    className
}: {
    actions: { label: string; icon?: React.ReactNode; href?: string; onClick?: () => void }[];
    className?: string;
}) {
    return (
        <div className={cn("flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/10 dark:border-white/5", className)}>
            {actions.map((action) => (
                <Button
                    key={action.label}
                    variant="secondary"
                    size="sm"
                    className="h-8 text-[12px] font-medium rounded-lg bg-primary/8 dark:bg-primary/12 text-primary hover:bg-primary/15 dark:hover:bg-primary/20 border-0 gap-1.5 transition-colors"
                    onClick={action.onClick}
                    asChild={!!action.href}
                >
                    {action.href ? (
                        <a href={action.href} target="_blank" rel="noopener noreferrer">
                            {action.icon}
                            {action.label}
                        </a>
                    ) : (
                        <span>
                            {action.icon}
                            {action.label}
                        </span>
                    )}
                </Button>
            ))}
        </div>
    );
}

/* ── Text Sub-components (unchanged API) ────────────────────── */

export function MessageLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-[11px] font-bold text-primary tracking-wider uppercase mb-1 opacity-80">
            {children}
        </div>
    );
}

export function MessageHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[17px] font-semibold text-foreground leading-tight mb-1">
            {children}
        </h3>
    );
}

export function MessageSubheading({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-[14px] font-medium text-muted-foreground leading-tight mb-2">
            {children}
        </div>
    );
}

export function MessageText({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-[14px] leading-relaxed text-foreground/85 dark:text-foreground/90", className)}>
            {children}
        </p>
    );
}

export function MessageList({ children }: { children: React.ReactNode }) {
    return (
        <ul className="space-y-1.5 mt-2">
            {children}
        </ul>
    );
}

export function MessageListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-2 text-[15px] text-foreground/90 leading-normal">
            <span className="text-primary mt-1">•</span>
            <span>{children}</span>
        </li>
    );
}
