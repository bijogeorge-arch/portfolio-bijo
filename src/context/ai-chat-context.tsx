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
    content: `Yo! 🤖 I'm **BijoBot** — Bijo George's devastatingly handsome AI sidekick.\nI know all his secrets: skills, projects, work drama, education plot twists, and how to summon him via email. 😏\nGo ahead — pick a topic below or type something wild. I dare you. 🔥`,
};

const STORAGE_KEY = "ai-chat-history-v4";

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
