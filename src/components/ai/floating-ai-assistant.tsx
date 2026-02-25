"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimations } from "@/context/animation-context";
import { LottieAnimation } from "@/components/lottie/lottie-animation";
import { AIChatPanel } from "@/components/ai/ai-chat-panel";
import { AIChatErrorBoundary } from "@/components/ai/ai-chat-error-boundary";
import botIdleData from "@/components/lottie/bot-idle-animation.json";

interface FloatingAIAssistantProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export function FloatingAIAssistant({
    isOpen: controlledOpen,
    onToggle,
}: FloatingAIAssistantProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const { animationsEnabled } = useAnimations();

    // Support both controlled and uncontrolled modes
    const isOpen =
        controlledOpen !== undefined ? controlledOpen : internalOpen;
    const handleToggle =
        onToggle || (() => setInternalOpen((prev) => !prev));
    const handleClose = onToggle ? onToggle : () => setInternalOpen(false);

    return (
        <>
            {/* Chat Panel — wrapped in error boundary */}
            <AIChatErrorBoundary>
                <AIChatPanel isOpen={isOpen} onClose={handleClose} />
            </AIChatErrorBoundary>

            {/* Floating Action Button */}
            <AnimatePresence>
                <motion.button
                    key="fab"
                    onClick={handleToggle}
                    className={cn(
                        "fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50",
                        "w-13 h-13 md:w-14 md:h-14 rounded-full",
                        "flex items-center justify-center",
                        "bg-primary text-primary-foreground",
                        "shadow-lg shadow-primary/30 dark:shadow-primary/20",
                        "hover:shadow-xl hover:shadow-primary/40 dark:hover:shadow-primary/30",
                        "transition-shadow duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
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
                    {/* Glow ring */}
                    <span
                        className={cn(
                            "absolute inset-0 rounded-full",
                            "bg-primary/30 animate-ping",
                            isOpen && "hidden"
                        )}
                        style={{ animationDuration: "3s" }}
                    />

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
                            >
                                <X className="w-6 h-6" />
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
                                className="relative"
                            >
                                {/* Show Lottie idle animation or fallback icon */}
                                <LottieAnimation
                                    animationData={botIdleData}
                                    className="w-9 h-9"
                                />
                                {!animationsEnabled && (
                                    <Bot className="w-6 h-6" />
                                )}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </AnimatePresence>
        </>
    );
}
