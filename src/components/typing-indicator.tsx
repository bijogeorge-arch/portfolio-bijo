"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Telegram-style "typing..." indicator with three bouncing dots.
 * Used during tab transitions to simulate a natural chat loading state.
 */
export function TypingIndicator() {
    return (
        <div className="flex items-end gap-2 px-4 py-3">
            {/* Avatar circle — mimics a contact placeholder */}
            <div className="w-8 h-8 rounded-full bg-muted/60 dark:bg-white/5 shrink-0" />

            {/* Bubble */}
            <div className="bg-background dark:bg-card rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-border/40 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="w-[7px] h-[7px] rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
