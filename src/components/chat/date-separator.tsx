"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DateSeparatorProps {
    children: React.ReactNode;
    className?: string;
}

export function DateSeparator({ children, className }: DateSeparatorProps) {
    return (
        <div className={cn("flex justify-center my-6 sticky top-2 z-20", className)}>
            <div className="bg-background/60 dark:bg-black/30 backdrop-blur-md px-4 py-1 rounded-full text-[13px] font-medium text-muted-foreground shadow-sm border border-border/20">
                {children}
            </div>
        </div>
    );
}
