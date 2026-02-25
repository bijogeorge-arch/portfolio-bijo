"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageLabel,
} from "@/components/chat/message-bubble";

interface Skill {
    name: string;
    /** Proficiency 0-100 */
    level: number;
}

const FRONTEND_SKILLS: Skill[] = [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Framer Motion", level: 85 },
    { name: "HTML / CSS", level: 95 },
    { name: "Redux / Zustand", level: 80 },
];

const BACKEND_SKILLS: Skill[] = [
    { name: "Node.js / Express", level: 88 },
    { name: "PostgreSQL", level: 85 },
    { name: "Prisma / Drizzle", level: 82 },
    { name: "REST & GraphQL APIs", level: 87 },
    { name: "Redis", level: 75 },
    { name: "Python / FastAPI", level: 72 },
];

const DEVOPS_SKILLS: Skill[] = [
    { name: "Docker", level: 80 },
    { name: "CI/CD (GitHub Actions)", level: 82 },
    { name: "Vercel / AWS", level: 78 },
    { name: "Git / Git Flow", level: 92 },
    { name: "Linux / Shell", level: 75 },
    { name: "Monitoring & Logging", level: 70 },
];

const TOOLS_SKILLS: Skill[] = [
    { name: "VS Code / Cursor", level: 95 },
    { name: "Figma", level: 80 },
    { name: "Notion / Linear", level: 85 },
    { name: "Postman / Insomnia", level: 82 },
];

function SkillBar({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <div className="space-y-1" ref={ref}>
            <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-foreground/90 dark:text-foreground/95">
                    {skill.name}
                </span>
                <motion.span
                    className="text-[11px] text-muted-foreground font-mono tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: delay + 0.5 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div className="h-1.5 w-full bg-muted/60 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: "0%" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: delay,
                    }}
                />
            </div>
        </div>
    );
}

function SkillGrid({ skills }: { skills: Skill[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2">
            {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.08} />
            ))}
        </div>
    );
}

export function SkillsView() {
    return (
        <>
            <DateSeparator>Frontend</DateSeparator>

            <MessageBubble>
                <MessageLabel>Client-Side Technologies</MessageLabel>
                <SkillGrid skills={FRONTEND_SKILLS} />
            </MessageBubble>

            <DateSeparator>Backend</DateSeparator>

            <MessageBubble>
                <MessageLabel>Server-Side & Databases</MessageLabel>
                <SkillGrid skills={BACKEND_SKILLS} />
            </MessageBubble>

            <DateSeparator>DevOps</DateSeparator>

            <MessageBubble>
                <MessageLabel>Infrastructure & Deployment</MessageLabel>
                <SkillGrid skills={DEVOPS_SKILLS} />
            </MessageBubble>

            <DateSeparator>Tools & Workflow</DateSeparator>

            <MessageBubble>
                <MessageLabel>Productivity</MessageLabel>
                <SkillGrid skills={TOOLS_SKILLS} />
            </MessageBubble>
        </>
    );
}
