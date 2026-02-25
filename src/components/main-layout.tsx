"use client";

import * as React from "react";
import { Sidebar, PORTFOLIO_TABS } from "./sidebar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, MoreVertical, Phone, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ChatFeed } from "./chat/chat-feed";
import { ChatSkeleton } from "./chat/chat-skeleton";
import { ProfileView } from "./views/profile-view";
import { ExperienceView } from "./views/experience-view";
import { ProjectsView } from "./views/projects-view";
import { SkillsView } from "./views/skills-view";
import { EducationView } from "./views/education-view";
import { LanguagesView } from "./views/languages-view";
import { ContactView } from "./views/contact-view";
import { SettingsView } from "./views/settings-view";
import { FloatingAIAssistant } from "./ai/floating-ai-assistant";
import { AnimatedStatusIcon } from "./animated-status-icon";
import { PinnedMessage } from "./pinned-message";
import { TypingIndicator } from "./typing-indicator";
import { DEVELOPER } from "@/lib/site-data";

const VIEW_MAP: Record<string, React.ComponentType> = {
    profile: ProfileView,
    experience: ExperienceView,
    projects: ProjectsView,
    skills: SkillsView,
    education: EducationView,
    languages: LanguagesView,
    contact: ContactView,
    settings: SettingsView,
};

/* ── Pinned message per tab ────────────────────────────────── */
const PINNED_MESSAGES: Record<string, string> = {
    profile: "Welcome! Check out my latest projects or download my resume.",
    experience: "5+ years of professional experience in full-stack development.",
    projects: "Explore my featured projects — click any card for details.",
    skills: "A snapshot of my technical stack and proficiency levels.",
    education: "Academic background and continuous learning journey.",
    languages: "Languages I speak and work in, professionally.",
    contact: "Feel free to reach out — I'm always open to new opportunities!",
    settings: "Customize your viewing experience.",
};

export function MainLayout({ children }: { children?: React.ReactNode }) {
    const [activeTab, setActiveTab] = React.useState("profile");
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const [isAIOpen, setIsAIOpen] = React.useState(false);

    // For spatial page transitions
    const [direction, setDirection] = React.useState(1);
    const previousTabRef = React.useRef("profile");

    // Loading skeleton micro-delay
    const [isLoading, setIsLoading] = React.useState(false);

    // Scroll container ref (wraps ScrollArea)
    const scrollWrapperRef = React.useRef<HTMLDivElement>(null);

    // Ref forwarded to the Sidebar search <input> so the header Search icon
    // can programmatically focus it.
    const sidebarSearchRef = React.useRef<HTMLInputElement>(null);

    const activeTabDetails = PORTFOLIO_TABS.find((t) => t.id === activeTab) || PORTFOLIO_TABS[0];
    const ActiveView = VIEW_MAP[activeTab];

    const handleTabChange = React.useCallback((id: string) => {
        if (id === activeTab) return;

        // Compute direction based on tab indices
        const prevIndex = PORTFOLIO_TABS.findIndex((t) => t.id === activeTab);
        const nextIndex = PORTFOLIO_TABS.findIndex((t) => t.id === id);
        setDirection(nextIndex > prevIndex ? 1 : -1);
        previousTabRef.current = activeTab;

        // Show skeleton for a micro-delay
        setIsLoading(true);
        setTimeout(() => {
            setActiveTab(id);
            setIsLoading(false);
        }, 150);

        setIsMobileOpen(false);
    }, [activeTab]);

    // ── Scroll to top on tab change ─────────────────────────────
    React.useEffect(() => {
        const viewport = scrollWrapperRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
        if (viewport) {
            viewport.scrollTop = 0;
        }
    }, [activeTab]);

    // ── Dynamic document.title ──────────────────────────────────
    React.useEffect(() => {
        const tabTitle = activeTabDetails.title;
        document.title = `${tabTitle} | ${DEVELOPER.name}`;
    }, [activeTab, activeTabDetails.title]);

    // ── Keyboard Navigation ─────────────────────────────────────
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't interfere with form inputs
            const target = e.target as HTMLElement;
            const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

            // Cmd+K / Ctrl+/ → toggle AI Assistant
            if ((e.metaKey && e.key === "k") || (e.ctrlKey && e.key === "/")) {
                e.preventDefault();
                setIsAIOpen((prev) => !prev);
                return;
            }

            // Don't process arrow keys if user is in an input field
            if (isInput) return;

            // ArrowUp / ArrowDown → navigate sidebar tabs
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
                const currentIndex = PORTFOLIO_TABS.findIndex((t) => t.id === activeTab);
                let nextIndex: number;

                if (e.key === "ArrowDown") {
                    nextIndex = currentIndex < PORTFOLIO_TABS.length - 1 ? currentIndex + 1 : 0;
                } else {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : PORTFOLIO_TABS.length - 1;
                }

                handleTabChange(PORTFOLIO_TABS[nextIndex].id);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeTab, handleTabChange]);

    // ── Header icon handlers ────────────────────────────────────
    const handleSearchClick = () => {
        // On desktop: focus the sidebar search input directly
        // On mobile: open the sheet first so the sidebar renders, then focus
        if (window.innerWidth < 768) {
            setIsMobileOpen(true);
            // Small delay so the Sheet can mount/animate before we focus
            setTimeout(() => sidebarSearchRef.current?.focus(), 350);
        } else {
            sidebarSearchRef.current?.focus();
        }
    };

    const handlePhoneClick = () => {
        handleTabChange("contact");
    };

    const handleMoreClick = () => {
        handleTabChange("settings");
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/20">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex w-[320px] lg:w-[380px] shrink-0">
                <Sidebar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    className="w-full"
                    searchInputRef={sidebarSearchRef}
                />
            </div>

            {/* Main Chat Panel */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#E5E5E5] dark:bg-[#0F0F0F] relative">
                {/* Subtle local pattern overlay — no external dependencies */}
                <div className="chat-bg-pattern" />

                {/* Sticky Header */}
                <header className="h-[56px] sm:h-[60px] flex items-center shrink-0 border-b border-border/40 bg-background/95 backdrop-blur z-10 px-3 sm:px-4 shadow-sm relative">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        {/* Mobile Sidebar Trigger */}
                        <div className="md:hidden">
                            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                                <SheetTrigger asChild>
                                    <button className="p-2 -ml-1 hover:bg-muted/80 rounded-full transition-colors" aria-label="Open menu">
                                        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-[85vw] max-w-[320px] border-r-0">
                                    <SheetTitle className="sr-only">Menu</SheetTitle>
                                    <Sidebar
                                        activeTab={activeTab}
                                        onTabChange={handleTabChange}
                                        className="w-full border-none"
                                        searchInputRef={sidebarSearchRef}
                                    />
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Header Content */}
                        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0">
                            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary shrink-0">
                                {activeTabDetails.icon}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="flex items-center gap-1.5 font-semibold text-[14px] sm:text-[15px] leading-tight text-foreground">
                                    <span className="truncate">{activeTabDetails.title}</span>
                                    {activeTabDetails.statusIcon && (
                                        <AnimatedStatusIcon
                                            iconType={activeTabDetails.statusIcon}
                                            size="0.9em"
                                        />
                                    )}
                                </span>
                                {/* Dynamic online status */}
                                <span className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse" />
                                    <span className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
                                        online
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Header Action Icons — now wired to real actions */}
                    <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground mr-1 shrink-0">
                        <button
                            onClick={handleSearchClick}
                            className="p-1.5 rounded-full hover:bg-muted/80 transition-colors hidden sm:flex items-center justify-center"
                            aria-label="Focus search"
                        >
                            <Search className="w-5 h-5 hover:text-primary transition-colors" />
                        </button>
                        <button
                            onClick={handlePhoneClick}
                            className="p-1.5 rounded-full hover:bg-muted/80 transition-colors hidden sm:flex items-center justify-center"
                            aria-label="Go to Contact"
                        >
                            <Phone className="w-5 h-5 hover:text-primary transition-colors" />
                        </button>
                        <ThemeToggle />
                        <button
                            onClick={handleMoreClick}
                            className="p-1.5 rounded-full hover:bg-muted/80 transition-colors flex items-center justify-center"
                            aria-label="Go to Settings"
                        >
                            <MoreVertical className="w-5 h-5 hover:text-primary transition-colors" />
                        </button>
                    </div>
                </header>

                {/* Pinned Message */}
                <PinnedMessage
                    key={activeTab}
                    message={PINNED_MESSAGES[activeTab] || "Welcome to my portfolio."}
                />

                {/* Scrollable Main Area */}
                <div className="flex-1 relative z-10 overflow-hidden" ref={scrollWrapperRef}>
                    <ScrollArea className="h-full w-full">
                        <div className="p-3 sm:p-4 md:p-8 max-w-4xl mx-auto min-h-full flex flex-col pb-20 sm:pb-8">
                            {children}

                            {!children && (
                                isLoading ? (
                                    <div className="flex flex-col">
                                        <TypingIndicator />
                                        <ChatSkeleton />
                                    </div>
                                ) : (
                                    <ChatFeed activeTab={activeTab} direction={direction}>
                                        {ActiveView ? <ActiveView /> : null}
                                    </ChatFeed>
                                )
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Floating AI Assistant — controlled by keyboard shortcut */}
            <FloatingAIAssistant
                isOpen={isAIOpen}
                onToggle={() => setIsAIOpen((prev) => !prev)}
            />
        </div>
    );
}
