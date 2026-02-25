"use client";

import React from "react";
import { Download } from "lucide-react";
import { DateSeparator } from "@/components/chat/date-separator";
import { MessageBubble, MessageLabel } from "@/components/chat/message-bubble";
import { LottieAnimation } from "@/components/lottie/lottie-animation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import codingAnimationData from "@/components/lottie/coding-animation.json";

const SKILLS = [
    "React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS",
    "Node.js", "Shopify Polaris", "Material UI", "Framer Motion",
    "Responsive Design", "Git & GitHub", "Generative AI",
];

export function ProfileView() {
    return (
        <>
            <DateSeparator>About Me</DateSeparator>

            <MessageBubble>
                <MessageLabel>Bio</MessageLabel>
                <div className="flex items-start gap-4">
                    {/* Profile Avatar */}
                    <div className="shrink-0">
                        <Avatar className="w-16 h-16 ring-2 ring-primary/20 shadow-md">
                            <AvatarImage src="/avatar.png" alt="Bijo George" />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">BG</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[15px] leading-relaxed text-foreground/90">
                            I&apos;m a passionate Frontend Developer with 1+ year of experience building
                            responsive and high-performance web applications using JavaScript and
                            React.js. Proficient in leveraging AI-assisted development tools like
                            Cursor and advanced prompt engineering to accelerate development.
                        </p>
                        <p className="text-[15px] leading-relaxed text-foreground/90 mt-2">
                            Currently pursuing my MCA and focused on creating fast,
                            user-centric, and efficient digital experiences.
                        </p>
                    </div>
                    <div className="shrink-0 mt-1 hidden sm:block">
                        <LottieAnimation
                            animationData={codingAnimationData}
                            className="w-14 h-14 opacity-80"
                        />
                    </div>
                </div>

                {/* Resume Download CTA */}
                <div className="mt-4 pt-3 border-t border-border/10 dark:border-white/5">
                    <Button
                        asChild
                        className="w-full sm:w-auto gap-2 h-10 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                    >
                        <a href="/resume.pdf" download>
                            <Download className="w-4 h-4" />
                            📄 Download Resume
                        </a>
                    </Button>
                </div>
            </MessageBubble>

            <MessageBubble>
                <MessageLabel>Core Competencies</MessageLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                    {SKILLS.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </MessageBubble>
        </>
    );
}
