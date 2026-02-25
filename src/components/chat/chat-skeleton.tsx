"use client";

import React from "react";
import { cn } from "@/lib/utils";

function ShimmerBar({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={cn(
                "rounded-md bg-muted/70 dark:bg-muted/40 relative overflow-hidden",
                className
            )}
            style={style}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                    animation: "shimmer 1.8s ease-in-out infinite",
                }}
            />
        </div>
    );
}

function SkeletonBubble({
    width = "70%",
    lines = 3,
    hasImage = false,
}: {
    width?: string;
    lines?: number;
    hasImage?: boolean;
}) {
    return (
        <div className="max-w-[85%] md:max-w-[70%] mb-3 self-start" style={{ width }}>
            <div className="bg-card dark:bg-[#212D3B] rounded-2xl rounded-bl-[4px] overflow-hidden border border-border/10 shadow-sm">
                {hasImage && (
                    <ShimmerBar className="w-full aspect-[16/9] rounded-none rounded-t-2xl" />
                )}
                <div className={cn("space-y-2.5", hasImage ? "px-4 py-3" : "px-4 py-3")}>
                    {/* Label shimmer */}
                    <ShimmerBar className="h-2.5 w-20" />
                    {/* Text lines */}
                    {Array.from({ length: lines }).map((_, i) => (
                        <ShimmerBar
                            key={i}
                            className="h-3"
                            style={{
                                width: i === lines - 1 ? "60%" : `${85 - i * 10}%`,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function ChatSkeleton() {
    return (
        <div className="flex flex-col space-y-1 w-full animate-in fade-in duration-150">
            {/* Date separator skeleton */}
            <div className="flex justify-center py-3">
                <ShimmerBar className="h-5 w-28 rounded-full" />
            </div>

            {/* Bubble skeletons */}
            <SkeletonBubble width="65%" lines={2} />
            <SkeletonBubble width="80%" lines={4} hasImage />
            <SkeletonBubble width="55%" lines={2} />
            <SkeletonBubble width="72%" lines={3} />
        </div>
    );
}
