"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimations } from "@/context/animation-context";
import { useAIChat } from "@/context/ai-chat-context";
import { LottieAnimation } from "@/components/lottie/lottie-animation";
import typingAnimationData from "@/components/lottie/typing-animation.json";

interface AIChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
    const { animationsEnabled } = useAnimations();
    const { messages, addMessage } = useAIChat();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user" as const,
            content: input.trim(),
        };

        addMessage(userMessage);
        setInput("");
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMessage]
                .filter((m) => m.id !== "greeting")
                .map((m) => ({ role: m.role, content: m.content }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages }),
            });

            const data = await res.json();

            if (data.error) {
                addMessage({
                    id: Date.now().toString(),
                    role: "assistant",
                    content: `⚠️ ${data.error}`,
                });
            } else {
                addMessage({
                    id: Date.now().toString(),
                    role: "assistant",
                    content: data.reply,
                });
            }
        } catch {
            addMessage({
                id: Date.now().toString(),
                role: "assistant",
                content:
                    "⚠️ Network error. Please check your connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const formatTime = () => {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const motionProps = animationsEnabled
        ? {
            initial: { opacity: 0, y: 8 } as const,
            animate: { opacity: 1, y: 0 } as const,
            transition: {
                duration: 0.2,
                ease: [0.21, 0.45, 0.32, 0.9] as const,
            },
        }
        : {};

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={
                        animationsEnabled
                            ? { opacity: 0, scale: 0.92, y: 20 }
                            : undefined
                    }
                    animate={
                        animationsEnabled
                            ? { opacity: 1, scale: 1, y: 0 }
                            : undefined
                    }
                    exit={
                        animationsEnabled
                            ? { opacity: 0, scale: 0.92, y: 20 }
                            : undefined
                    }
                    transition={{
                        duration: 0.25,
                        ease: [0.21, 0.45, 0.32, 0.9],
                    }}
                    className={cn(
                        "fixed bottom-20 right-4 md:right-6 z-50",
                        "w-[360px] sm:w-[400px] h-[520px] max-h-[80vh]",
                        "rounded-2xl overflow-hidden",
                        "bg-background border border-border/60",
                        "shadow-2xl shadow-black/20 dark:shadow-black/50",
                        "flex flex-col"
                    )}
                >
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm leading-tight">
                                AI Assistant
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                                <span className="text-[11px] text-primary-foreground/80">
                                    {isLoading ? "typing..." : "online"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-primary-foreground/60" />
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-full hover:bg-white/20 transition-colors ml-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div
                        className={cn(
                            "flex-1 overflow-y-auto px-3 py-4 space-y-3",
                            "bg-[#E8E8E8] dark:bg-[#0c1118]",
                            "scrollbar-thin scrollbar-thumb-muted-foreground/20"
                        )}
                    >
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                {...motionProps}
                                className={cn(
                                    "flex",
                                    msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[85%] px-3.5 py-2.5 text-[14px] leading-relaxed relative",
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-[4px]"
                                            : "bg-card dark:bg-[#212D3B] text-card-foreground rounded-2xl rounded-bl-[4px] shadow-sm border border-border/10 dark:border-none"
                                    )}
                                >
                                    {msg.content.split("\n").map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i <
                                                msg.content.split("\n").length -
                                                1 && <br />}
                                        </React.Fragment>
                                    ))}
                                    <span
                                        className={cn(
                                            "text-[10px] float-right ml-2 mt-1",
                                            msg.role === "user"
                                                ? "text-primary-foreground/60"
                                                : "text-muted-foreground/60"
                                        )}
                                    >
                                        {formatTime()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <motion.div
                                initial={
                                    animationsEnabled
                                        ? { opacity: 0, y: 5 }
                                        : undefined
                                }
                                animate={
                                    animationsEnabled
                                        ? { opacity: 1, y: 0 }
                                        : undefined
                                }
                                className="flex justify-start"
                            >
                                <div className="bg-card dark:bg-[#212D3B] rounded-2xl rounded-bl-[4px] shadow-sm border border-border/10 dark:border-none px-4 py-3">
                                    <LottieAnimation
                                        animationData={typingAnimationData}
                                        className="w-12 h-5"
                                    />
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center gap-2 px-3 py-3 bg-background border-t border-border/40 shrink-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about skills, projects..."
                            disabled={isLoading}
                            className={cn(
                                "flex-1 bg-muted/50 border border-transparent rounded-full",
                                "px-4 py-2.5 text-sm text-foreground",
                                "placeholder:text-muted-foreground/60",
                                "focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-background",
                                "transition-all duration-200",
                                "disabled:opacity-50"
                            )}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full",
                                "bg-primary text-primary-foreground",
                                "hover:bg-primary/90 active:scale-95",
                                "transition-all duration-150",
                                "disabled:opacity-40 disabled:hover:bg-primary disabled:active:scale-100"
                            )}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
