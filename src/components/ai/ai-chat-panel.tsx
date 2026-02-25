"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Bot,
    X,
    Sparkles,
    Code2,
    Briefcase,
    GraduationCap,
    Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimations } from "@/context/animation-context";
import { useAIChat } from "@/context/ai-chat-context";

// ── Quick suggestion chips ────────────────────────────────────────────────
const SUGGESTIONS = [
    { label: "Skills & Tech", icon: Code2, prompt: "What are Bijo's main technical skills?" },
    { label: "Experience", icon: Briefcase, prompt: "Tell me about Bijo's work experience" },
    { label: "Education", icon: GraduationCap, prompt: "What is Bijo's educational background?" },
    { label: "Contact", icon: Mail, prompt: "How can I contact Bijo?" },
];

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

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            role: "user" as const,
            content: messageText,
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
                    content:
                        "I'm having trouble connecting right now, but I can still help! Try asking about Bijo's **skills**, **projects**, **experience**, or **contact info** 😊",
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
                    "Hmm, looks like there's a network issue. Please check your connection and try again! 🔌",
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

    const formatTime = (date?: Date) => {
        return (date || new Date()).toLocaleTimeString([], {
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

    // Only show suggestions if there are no user messages yet
    const showSuggestions = messages.filter((m) => m.role === "user").length === 0;

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
                    {/* ── Chat Header ─────────────────────────────────── */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shrink-0">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm leading-tight">
                                AI Assistant
                            </h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                                <span className="text-[11px] text-white/80">
                                    {isLoading ? "typing…" : "online"}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-white/60" />
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-full hover:bg-white/20 transition-colors ml-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* ── Messages Area ────────────────────────────────── */}
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
                                            ? "bg-blue-500 dark:bg-blue-600 text-white rounded-2xl rounded-br-[4px]"
                                            : "bg-card dark:bg-[#212D3B] text-card-foreground rounded-2xl rounded-bl-[4px] shadow-sm border border-border/10 dark:border-none"
                                    )}
                                >
                                    {/* Simple markdown-like bold support */}
                                    {msg.content.split("\n").map((line, i) => (
                                        <React.Fragment key={i}>
                                            {renderLine(line)}
                                            {i <
                                                msg.content.split("\n").length -
                                                1 && <br />}
                                        </React.Fragment>
                                    ))}
                                    <span
                                        className={cn(
                                            "text-[10px] float-right ml-2 mt-1",
                                            msg.role === "user"
                                                ? "text-white/60"
                                                : "text-muted-foreground/60"
                                        )}
                                    >
                                        {formatTime()}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* ── Suggestion Chips ─────────────────────────── */}
                        {showSuggestions && !isLoading && (
                            <motion.div
                                {...motionProps}
                                className="flex flex-wrap gap-2 pt-1"
                            >
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s.label}
                                        onClick={() => sendMessage(s.prompt)}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5",
                                            "text-xs font-medium rounded-full",
                                            "bg-blue-50 dark:bg-blue-900/30",
                                            "text-blue-600 dark:text-blue-400",
                                            "border border-blue-200 dark:border-blue-800/50",
                                            "hover:bg-blue-100 dark:hover:bg-blue-900/50",
                                            "hover:border-blue-300 dark:hover:border-blue-700",
                                            "transition-all duration-150 cursor-pointer",
                                            "active:scale-95"
                                        )}
                                    >
                                        <s.icon className="w-3 h-3" />
                                        {s.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* ── Typing Indicator ─────────────────────────── */}
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
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* ── Input Area ───────────────────────────────────── */}
                    <div className="flex items-center gap-2 px-3 py-3 bg-background border-t border-border/40 shrink-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about skills, projects…"
                            disabled={isLoading}
                            className={cn(
                                "flex-1 bg-muted/50 border border-transparent rounded-full",
                                "px-4 py-2.5 text-sm text-foreground",
                                "placeholder:text-muted-foreground/60",
                                "focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:bg-background",
                                "transition-all duration-200",
                                "disabled:opacity-50"
                            )}
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full",
                                "bg-blue-500 dark:bg-blue-600 text-white",
                                "hover:bg-blue-600 dark:hover:bg-blue-500 active:scale-95",
                                "transition-all duration-150",
                                "disabled:opacity-40 disabled:hover:bg-blue-500 disabled:active:scale-100"
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

// ── Helper: render **bold** text in messages ──────────────────────────────
function renderLine(line: string): React.ReactNode {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className="font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}
