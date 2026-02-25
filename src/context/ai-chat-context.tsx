"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

// ── Types ──────────────────────────────────────────────────────
export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface AIChatContextType {
    messages: ChatMessage[];
    addMessage: (msg: ChatMessage) => void;
    setMessages: (msgs: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
    clearHistory: () => void;
}

const INITIAL_GREETING: ChatMessage = {
    id: "greeting",
    role: "assistant",
    content: `Hi 👋\nI'm the personal AI assistant of this developer.\nAsk me anything about skills, projects, or experience.`,
};

const STORAGE_KEY = "ai-chat-history";

// ── Context ────────────────────────────────────────────────────
const AIChatContext = createContext<AIChatContextType>({
    messages: [INITIAL_GREETING],
    addMessage: () => { },
    setMessages: () => { },
    clearHistory: () => { },
});

// ── Provider ───────────────────────────────────────────────────
export function AIChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useLocalStorage<ChatMessage[]>(
        STORAGE_KEY,
        [INITIAL_GREETING]
    );

    const addMessage = useCallback(
        (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg]);
        },
        [setMessages]
    );

    const clearHistory = useCallback(() => {
        setMessages([INITIAL_GREETING]);
    }, [setMessages]);

    return (
        <AIChatContext.Provider
            value={{ messages, addMessage, setMessages, clearHistory }}
        >
            {children}
        </AIChatContext.Provider>
    );
}

// ── Hook ───────────────────────────────────────────────────────
export function useAIChat() {
    return useContext(AIChatContext);
}
