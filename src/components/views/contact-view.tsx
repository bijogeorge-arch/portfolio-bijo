"use client";

import React, { useState } from "react";
import { Send, Loader2, Linkedin, Github, Twitter, Mail, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { DateSeparator } from "@/components/chat/date-separator";
import {
    MessageBubble,
    MessageLabel,
    MessageText,
    MessageInlineActions,
} from "@/components/chat/message-bubble";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/site-data";

/** Map icon names from site-data to actual Lucide components */
const ICON_MAP: Record<string, React.ReactNode> = {
    Linkedin: <Linkedin className="w-3.5 h-3.5" />,
    Github: <Github className="w-3.5 h-3.5" />,
    Twitter: <Twitter className="w-3.5 h-3.5" />,
    Mail: <Mail className="w-3.5 h-3.5" />,
};

export function ContactView() {
    const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;

        setFormState("sending");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            // Success  — show confirmation, then reset after 4 seconds
            setFormState("sent");
            setTimeout(() => {
                setFormState("idle");
                setName("");
                setEmail("");
                setMessage("");
            }, 4000);
        } catch (err) {
            console.error("[Contact Form]", err);
            setErrorMessage(
                err instanceof Error ? err.message : "Failed to send. Please try again."
            );
            setFormState("error");
            // Auto-dismiss error after 5 seconds
            setTimeout(() => setFormState("idle"), 5000);
        }
    };

    return (
        <>
            <DateSeparator>Get in Touch</DateSeparator>

            {/* Intro bubble */}
            <MessageBubble>
                <MessageLabel>
                    <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Open to Opportunities
                    </span>
                </MessageLabel>
                <MessageText>
                    I&apos;m currently open to new opportunities and would love to hear from you.
                    Whether you have a question, a project idea, or just want to say hi —
                    feel free to reach out!
                </MessageText>
                <MessageText className="mt-2 text-muted-foreground">
                    Response time: usually within 24 hours ⚡
                </MessageText>
            </MessageBubble>

            {/* Contact Form bubble */}
            <MessageBubble className="max-w-[92%] md:max-w-[75%]">
                <MessageLabel>Send a Message</MessageLabel>
                <form onSubmit={handleSubmit} className="mt-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label
                                htmlFor="contact-name"
                                className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide"
                            >
                                Name
                            </label>
                            <Input
                                id="contact-name"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-9 text-[13px] bg-muted/40 dark:bg-white/5 border-border/20 dark:border-white/10 rounded-lg focus-visible:ring-primary/30"
                                disabled={formState === "sending"}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label
                                htmlFor="contact-email"
                                className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide"
                            >
                                Email
                            </label>
                            <Input
                                id="contact-email"
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-9 text-[13px] bg-muted/40 dark:bg-white/5 border-border/20 dark:border-white/10 rounded-lg focus-visible:ring-primary/30"
                                disabled={formState === "sending"}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label
                            htmlFor="contact-message"
                            className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide"
                        >
                            Message
                        </label>
                        <Textarea
                            id="contact-message"
                            placeholder="Tell me about your project or just say hello..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[100px] text-[13px] bg-muted/40 dark:bg-white/5 border-border/20 dark:border-white/10 rounded-lg resize-none focus-visible:ring-primary/30"
                            disabled={formState === "sending"}
                            required
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {formState === "sent" ? (
                            <motion.div
                                key="sent"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-chart-2 text-[13px] font-medium py-1"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Message sent successfully! I&apos;ll get back to you soon.
                            </motion.div>
                        ) : formState === "error" ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-destructive text-[13px] font-medium py-1"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {errorMessage}
                            </motion.div>
                        ) : (
                            <motion.div key="btn" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="h-9 rounded-lg text-[13px] font-medium gap-2 w-full sm:w-auto"
                                    disabled={formState === "sending"}
                                >
                                    {formState === "sending" ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </MessageBubble>

            {/* Quick Links bubble — powered by centralized SOCIAL_LINKS */}
            <MessageBubble>
                <MessageLabel>Quick Links</MessageLabel>
                <MessageText className="mb-1">
                    Connect with me on your preferred platform:
                </MessageText>
                <MessageInlineActions
                    className="border-t-0 pt-1"
                    actions={SOCIAL_LINKS.map((link) => ({
                        label: link.label,
                        icon: ICON_MAP[link.iconName],
                        href: link.href,
                    }))}
                />
            </MessageBubble>
        </>
    );
}
