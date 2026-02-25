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
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 75 },
    { name: "JavaScript (ES6+)", level: 88 },
    { name: "HTML5 / CSS3", level: 92 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Material UI", level: 78 },
    { name: "Framer Motion", level: 70 },
    { name: "jQuery", level: 65 },
];

const TOOLS_SKILLS: Skill[] = [
    { name: "Shopify / Polaris", level: 80 },
    { name: "Responsive Design", level: 88 },
    { name: "UI/UX Interpretation", level: 78 },
    { name: "Theme Customization", level: 82 },
    { name: "Performance Optimization", level: 75 },
];

const DEVTOOLS_SKILLS: Skill[] = [
    { name: "Git & GitHub", level: 82 },
    { name: "VS Code / Cursor", level: 90 },
    { name: "Generative AI / Prompt Engineering", level: 85 },
    { name: "Netlify / Vercel", level: 75 },
    { name: "Node.js", level: 65 },
    { name: "REST APIs", level: 72 },
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

            <DateSeparator>Shopify & Design</DateSeparator>

            <MessageBubble>
                <MessageLabel>E-Commerce & UI/UX</MessageLabel>
                <SkillGrid skills={TOOLS_SKILLS} />
            </MessageBubble>

            <DateSeparator>Dev Tools & Others</DateSeparator>

            <MessageBubble>
                <MessageLabel>Tools, AI & Backend</MessageLabel>
                <SkillGrid skills={DEVTOOLS_SKILLS} />
            </MessageBubble>
        </>
    );
}
