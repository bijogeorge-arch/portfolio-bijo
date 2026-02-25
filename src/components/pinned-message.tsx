"use client";

import React from "react";
import { Pin } from "lucide-react";
import { motion } from "framer-motion";

interface PinnedMessageProps {
    message: string;
    label?: string;
}

export function PinnedMessage({ message, label = "Pinned Message" }: PinnedMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="sticky top-0 z-20 flex items-center gap-3 px-4 py-2.5 border-b border-border/30 bg-background/90 backdrop-blur-md cursor-pointer hover:bg-muted/40 transition-colors group"
        >
            {/* Accent bar */}
            <div className="w-[3px] h-8 rounded-full bg-primary shrink-0" />

            {/* Icon */}
            <Pin className="w-4 h-4 text-primary shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300" />

            {/* Content */}
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-primary leading-tight">
                    {label}
                </span>
                <span className="text-[13px] text-foreground/80 truncate leading-tight mt-0.5">
                    {message}
                </span>
            </div>
        </motion.div>
    );
}
