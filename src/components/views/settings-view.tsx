"use client";

import React from "react";
import { useTheme } from "next-themes";
import { DateSeparator } from "@/components/chat/date-separator";
import { MessageBubble, MessageLabel } from "@/components/chat/message-bubble";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAnimations } from "@/context/animation-context";
import { useLayoutDensity, LayoutDensity } from "@/context/layout-density-context";
import { Moon, Sun, Monitor, Sparkles, Layout } from "lucide-react";

export function SettingsView() {
    const { theme, setTheme } = useTheme();
    const { animationsEnabled, setAnimationsEnabled } = useAnimations();
    const { density, setDensity } = useLayoutDensity();

    return (
        <>
            <DateSeparator>Preferences</DateSeparator>

            {/* Theme Toggle */}
            <MessageBubble>
                <MessageLabel>Appearance</MessageLabel>
                <div className="space-y-4 mt-2">
                    {/* Theme selector */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                {theme === "dark" ? (
                                    <Moon className="w-4 h-4" />
                                ) : theme === "light" ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Monitor className="w-4 h-4" />
                                )}
                            </div>
                            <div>
                                <Label className="text-[14px] font-medium text-foreground cursor-pointer">
                                    Theme
                                </Label>
                                <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
                                    Choose your preferred appearance
                                </p>
                            </div>
                        </div>
                        <Select value={theme || "system"} onValueChange={setTheme}>
                            <SelectTrigger className="w-[130px] h-9 text-sm rounded-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">
                                    <div className="flex items-center gap-2">
                                        <Sun className="w-3.5 h-3.5" />
                                        Light
                                    </div>
                                </SelectItem>
                                <SelectItem value="dark">
                                    <div className="flex items-center gap-2">
                                        <Moon className="w-3.5 h-3.5" />
                                        Dark
                                    </div>
                                </SelectItem>
                                <SelectItem value="system">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="w-3.5 h-3.5" />
                                        System
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </MessageBubble>

            {/* Animation Toggle */}
            <MessageBubble>
                <MessageLabel>Motion & Effects</MessageLabel>
                <div className="space-y-4 mt-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-chart-5/10 text-chart-5">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <Label
                                    htmlFor="animation-toggle"
                                    className="text-[14px] font-medium text-foreground cursor-pointer"
                                >
                                    Animations
                                </Label>
                                <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
                                    Enable smooth transitions & Lottie effects
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="animation-toggle"
                            checked={animationsEnabled}
                            onCheckedChange={setAnimationsEnabled}
                        />
                    </div>
                </div>
            </MessageBubble>

            {/* Layout Density */}
            <MessageBubble>
                <MessageLabel>Layout</MessageLabel>
                <div className="space-y-4 mt-2">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-chart-2/10 text-chart-2">
                                <Layout className="w-4 h-4" />
                            </div>
                            <div>
                                <Label className="text-[14px] font-medium text-foreground cursor-pointer">
                                    Density
                                </Label>
                                <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
                                    Adjust spacing in chat bubbles
                                </p>
                            </div>
                        </div>
                        <Select
                            value={density}
                            onValueChange={(val) => setDensity(val as LayoutDensity)}
                        >
                            <SelectTrigger className="w-[140px] h-9 text-sm rounded-lg">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                <SelectItem value="compact">Compact</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </MessageBubble>

            <DateSeparator>Info</DateSeparator>

            <MessageBubble>
                <MessageLabel>About this Portfolio</MessageLabel>
                <p className="text-[14px] leading-relaxed text-foreground/80 mt-1">
                    Built with <span className="text-primary font-medium">Next.js</span>,{" "}
                    <span className="text-primary font-medium">Tailwind CSS</span>,{" "}
                    <span className="text-primary font-medium">shadcn/ui</span>, and{" "}
                    <span className="text-primary font-medium">Framer Motion</span>.
                </p>
                <p className="text-[12px] text-muted-foreground mt-2">
                    AI Assistant powered by OpenRouter • Animations by Lottie
                </p>
            </MessageBubble>
        </>
    );
}
