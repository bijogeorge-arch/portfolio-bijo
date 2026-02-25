"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimations } from "@/context/animation-context";
import { AIChatPanel } from "@/components/ai/ai-chat-panel";
import { AIChatErrorBoundary } from "@/components/ai/ai-chat-error-boundary";

interface FloatingAIAssistantProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export function FloatingAIAssistant({
    isOpen: controlledOpen,
    onToggle,
}: FloatingAIAssistantProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const { animationsEnabled } = useAnimations();

    // Support both controlled and uncontrolled modes
    const isOpen =
        controlledOpen !== undefined ? controlledOpen : internalOpen;
    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setInternalOpen((prev) => !prev);
        }
        // Hide tooltip when chat is opened
        setShowGreeting(false);
    };
    const handleClose = () => {
        if (onToggle) {
            onToggle();
        } else {
            setInternalOpen(false);
        }
    };

    // Show the greeting tooltip after a short delay on first load
    useEffect(() => {
        const dismissed = sessionStorage.getItem("ai-greeting-dismissed");
        if (dismissed) return;

        const timer = setTimeout(() => {
            setShowGreeting(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Hide greeting when chat opens
    useEffect(() => {
        if (isOpen) setShowGreeting(false);
    }, [isOpen]);

    const dismissGreeting = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowGreeting(false);
        sessionStorage.setItem("ai-greeting-dismissed", "true");
    };

    return (
        <>
            {/* Chat Panel — wrapped in error boundary */}
            <AIChatErrorBoundary>
                <AIChatPanel isOpen={isOpen} onClose={handleClose} />
            </AIChatErrorBoundary>

            {/* ── Greeting Tooltip ─────────────────────────────── */}
            <AnimatePresence>
                {showGreeting && !isOpen && (
                    <motion.div
                        key="greeting-tooltip"
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={cn(
                            "fixed bottom-8 right-20 md:bottom-9 md:right-[88px] z-50",
                            "bg-white dark:bg-[#1e293b] text-foreground",
                            "rounded-xl rounded-br-sm",
                            "shadow-lg shadow-black/10 dark:shadow-black/30",
                            "border border-border/50 dark:border-white/10",
                            "px-4 py-3 max-w-[220px]",
                            "cursor-pointer"
                        )}
                        onClick={handleToggle}
                    >
                        {/* Close button */}
                        <button
                            onClick={dismissGreeting}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                        >
                            <X className="w-3 h-3 text-muted-foreground" />
                        </button>

                        <p className="text-sm font-medium leading-snug">
                            Hi there! 👋
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                            I&apos;m Bijo&apos;s AI assistant. Ask me anything!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Floating Action Button ───────────────────────── */}
            <AnimatePresence>
                <motion.button
                    key="fab"
                    onClick={handleToggle}
                    aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
                    className={cn(
                        "fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50",
                        "w-14 h-14 md:w-[60px] md:h-[60px] rounded-full",
                        "flex items-center justify-center",
                        "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
                        "text-white",
                        "shadow-lg shadow-blue-500/30 dark:shadow-blue-600/20",
                        "hover:shadow-xl hover:shadow-blue-500/40 dark:hover:shadow-blue-600/30",
                        "hover:from-blue-400 hover:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600",
                        "transition-shadow duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-background",
                        "group cursor-pointer"
                    )}
                    whileHover={
                        animationsEnabled
                            ? { scale: 1.08, y: -2 }
                            : undefined
                    }
                    whileTap={
                        animationsEnabled ? { scale: 0.95 } : undefined
                    }
                    initial={
                        animationsEnabled
                            ? { scale: 0, opacity: 0 }
                            : undefined
                    }
                    animate={
                        animationsEnabled
                            ? { scale: 1, opacity: 1 }
                            : undefined
                    }
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.5,
                    }}
                >
                    {/* Subtle glow ring — only when closed */}
                    {!isOpen && (
                        <span
                            className={cn(
                                "absolute inset-0 rounded-full",
                                "bg-blue-400/25 animate-ping"
                            )}
                            style={{ animationDuration: "3s" }}
                        />
                    )}

                    {/* Button content */}
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span
                                key="close"
                                initial={
                                    animationsEnabled
                                        ? { rotate: -90, opacity: 0 }
                                        : undefined
                                }
                                animate={
                                    animationsEnabled
                                        ? { rotate: 0, opacity: 1 }
                                        : undefined
                                }
                                exit={
                                    animationsEnabled
                                        ? { rotate: 90, opacity: 0 }
                                        : undefined
                                }
                                transition={{ duration: 0.15 }}
                                className="flex items-center justify-center"
                            >
                                <X className="w-6 h-6" strokeWidth={2.5} />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="bot"
                                initial={
                                    animationsEnabled
                                        ? { rotate: 90, opacity: 0 }
                                        : undefined
                                }
                                animate={
                                    animationsEnabled
                                        ? { rotate: 0, opacity: 1 }
                                        : undefined
                                }
                                exit={
                                    animationsEnabled
                                        ? { rotate: -90, opacity: 0 }
                                        : undefined
                                }
                                transition={{ duration: 0.15 }}
                                className="relative flex items-center justify-center"
                            >
                                <MessageCircle className="w-7 h-7" fill="currentColor" strokeWidth={0} />
                                {/* Sparkle dot */}
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-500 animate-pulse" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </AnimatePresence>
        </>
    );
}
