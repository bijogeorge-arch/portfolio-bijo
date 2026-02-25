"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedStatusIcon, type AnimatedIconType } from "./animated-status-icon";

interface SidebarItemProps {
    icon: React.ReactNode;
    title: string;
    previewText?: string;
    isActive?: boolean;
    onClick?: () => void;
    time?: string;
    statusIcon?: AnimatedIconType;
    badgeCount?: number;
}

export function SidebarItem({
    icon,
    title,
    previewText,
    isActive,
    onClick,
    time,
    statusIcon,
    badgeCount,
}: SidebarItemProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={isActive ? undefined : { x: 4, scale: 1.01 }}
            whileTap={isActive ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
                "group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg cursor-pointer select-none transition-colors duration-200",
                isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-muted/80 text-foreground"
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-colors",
                    isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground shadow-sm"
                )}
            >
                {icon}
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex justify-between items-baseline mb-0.5">
                    <span className="flex items-center gap-1.5">
                        <span
                            className={cn(
                                "font-medium truncate text-[15px]",
                                isActive ? "text-primary-foreground" : "text-foreground"
                            )}
                        >
                            {title}
                        </span>
                        {statusIcon && (
                            <AnimatedStatusIcon
                                iconType={statusIcon}
                                size="0.8em"
                            />
                        )}
                    </span>
                    {time && (
                        <span
                            className={cn(
                                "text-xs shrink-0 pl-2",
                                isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}
                        >
                            {time}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {previewText && (
                        <p
                            className={cn(
                                "text-sm truncate flex-1 min-w-0",
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}
                        >
                            {previewText}
                        </p>
                    )}
                    {badgeCount != null && badgeCount > 0 && !isActive && (
                        <span
                            className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold leading-none shrink-0 shadow-sm"
                        >
                            {badgeCount}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
