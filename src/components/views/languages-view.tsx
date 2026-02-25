"use client";

import React from "react";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageLabel,
} from "@/components/chat/message-bubble";

interface Language {
    name: string;
    proficiency: string;
    flag: string;
    /** Visual level 1–5 (filled dots) */
    level: number;
}

const LANGUAGES: Language[] = [
    { name: "English", proficiency: "Native / Bilingual", flag: "🇺🇸", level: 5 },
    { name: "Spanish", proficiency: "Professional Working", flag: "🇪🇸", level: 3 },
    { name: "French", proficiency: "Elementary", flag: "🇫🇷", level: 2 },
    { name: "Hindi", proficiency: "Native / Bilingual", flag: "🇮🇳", level: 5 },
];

function ProficiencyDots({ level, max = 5 }: { level: number; max?: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: max }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i < level
                            ? "bg-primary"
                            : "bg-muted-foreground/20 dark:bg-white/10"
                        }`}
                />
            ))}
        </div>
    );
}

export function LanguagesView() {
    return (
        <>
            <DateSeparator>Languages</DateSeparator>

            <MessageBubble>
                <MessageLabel>Spoken Languages</MessageLabel>
                <div className="space-y-3.5 mt-2">
                    {LANGUAGES.map((lang) => (
                        <div
                            key={lang.name}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xl shrink-0">{lang.flag}</span>
                                <div className="min-w-0">
                                    <p className="text-[14px] font-medium text-foreground leading-tight">
                                        {lang.name}
                                    </p>
                                    <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
                                        {lang.proficiency}
                                    </p>
                                </div>
                            </div>
                            <ProficiencyDots level={lang.level} />
                        </div>
                    ))}
                </div>
            </MessageBubble>

            <MessageBubble>
                <MessageLabel>Programming Languages</MessageLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                    {[
                        "TypeScript",
                        "JavaScript",
                        "Python",
                        "SQL",
                        "HTML/CSS",
                        "Bash",
                        "Rust (learning)",
                    ].map((lang) => (
                        <span
                            key={lang}
                            className="px-3 py-1 bg-primary/8 dark:bg-primary/12 text-primary text-[12px] font-medium rounded-full border border-primary/15 dark:border-primary/20"
                        >
                            {lang}
                        </span>
                    ))}
                </div>
            </MessageBubble>
        </>
    );
}
