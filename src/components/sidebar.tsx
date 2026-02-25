"use client";

import * as React from "react";
import { User, Briefcase, Code, Terminal, GraduationCap, Globe, Mail, Settings, Search, Menu } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedStatusIcon, type AnimatedIconType } from "./animated-status-icon";

export const PORTFOLIO_TABS = [
    { id: "profile", title: "Profile", icon: <User className="w-6 h-6" />, text: "Full-Stack Developer & UI Engineer...", time: "10:00", statusIcon: "profile-wave" as AnimatedIconType },
    { id: "experience", title: "Experience", icon: <Briefcase className="w-6 h-6" />, text: "Worked at Tech Corp with 5+ yrs...", time: "09:45", statusIcon: "experience-rocket" as AnimatedIconType },
    { id: "projects", title: "Projects", icon: <Code className="w-6 h-6" />, text: "Built Telegram-style portfolio site...", time: "Yesterday", statusIcon: "projects-tools" as AnimatedIconType, badgeCount: 4 },
    { id: "skills", title: "Skills", icon: <Terminal className="w-6 h-6" />, text: "React, Next.js, TailwindCSS, Node...", time: "Yesterday", statusIcon: "skills-zap" as AnimatedIconType, badgeCount: 11 },
    { id: "education", title: "Education", icon: <GraduationCap className="w-6 h-6" />, text: "BSc in Computer Science...", time: "Tue", statusIcon: "education-cap" as AnimatedIconType },
    { id: "languages", title: "Languages", icon: <Globe className="w-6 h-6" />, text: "English (Native), Spanish (Basic)...", time: "Mon", statusIcon: "languages-globe" as AnimatedIconType },
    { id: "contact", title: "Contact", icon: <Mail className="w-6 h-6" />, text: "Available for new opportunities...", time: "Mon", statusIcon: "contact-mail" as AnimatedIconType },
    { id: "settings", title: "Settings", icon: <Settings className="w-6 h-6" />, text: "Theme, Preferences...", time: "Oct 25", statusIcon: "settings-gear" as AnimatedIconType },
];

interface SidebarProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
    /** Forwarded ref to the search input — used by the header Search icon */
    searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function Sidebar({ activeTab, onTabChange, className, searchInputRef }: SidebarProps) {
    const [searchQuery, setSearchQuery] = React.useState("");

    // Filter tabs based on the search query (match against title)
    const filteredTabs = React.useMemo(() => {
        if (!searchQuery.trim()) return PORTFOLIO_TABS;
        const q = searchQuery.toLowerCase();
        return PORTFOLIO_TABS.filter(
            (tab) =>
                tab.title.toLowerCase().includes(q) ||
                tab.text.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        // Outer flex column fills the available height; `min-h-0` ensures the
        // flex child with `flex-1` can actually shrink below its content height,
        // which is what makes ScrollArea's overflow kick in.
        <div className={`flex flex-col h-full bg-background border-r border-border shadow-sm ${className}`}>
            {/* User Name Header with Avatar */}
            <div className="px-4 pt-4 pb-1 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                            <AvatarImage src="/avatar.png" alt="Bijo George" />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">BG</AvatarFallback>
                        </Avatar>
                        {/* Online status dot */}
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background shadow-sm" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="flex items-center gap-1.5">
                            <span className="text-[15px] font-bold text-foreground tracking-tight truncate">Bijo George</span>
                            <AnimatedStatusIcon iconType="premium-star" size="0.85em" />
                        </span>
                        <span className="text-[11px] text-green-500 font-medium leading-tight mt-0.5">online</span>
                    </div>
                </div>
            </div>

            {/* Top Search Bar */}
            <div className="p-3 bg-background/95 backdrop-blur z-10 shrink-0 flex gap-2 items-center">
                <div className="md:hidden">
                    <Menu className="w-6 h-6 text-muted-foreground ml-1" />
                </div>
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary h-9 rounded-full pl-9 pr-4 text-sm transition-all focus-visible:bg-background"
                    />
                </div>
            </div>

            {/* Chat List — flex-1 + min-h-0 enables ScrollArea overflow */}
            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full w-full p-2">
                    <div className="space-y-1">
                        {filteredTabs.length > 0 ? (
                            filteredTabs.map((tab) => (
                                <SidebarItem
                                    key={tab.id}
                                    title={tab.title}
                                    previewText={tab.text}
                                    icon={tab.icon}
                                    time={tab.time}
                                    isActive={activeTab === tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    statusIcon={tab.statusIcon}
                                    badgeCount={tab.badgeCount}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <Search className="w-8 h-8 mb-2 opacity-40" />
                                <span className="text-sm">No chats found</span>
                                <span className="text-xs opacity-60 mt-1">Try a different search term</span>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
