"use client";

import React, { Component, type ReactNode } from "react";
import { WifiOff, RefreshCw, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    children: ReactNode;
    /** Optional className applied to the fallback container */
    className?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary that wraps the AI Chat panel.
 *
 * If the panel throws (e.g. API failure, render error), it displays
 * a graceful "Disconnected" fallback *inside* the panel area, keeping
 * the rest of the portfolio fully functional.
 */
export class AIChatErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("[AIChatErrorBoundary]", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className={cn(
                        "flex flex-col items-center justify-center h-full w-full",
                        "bg-background/95 backdrop-blur-sm",
                        "text-center px-6 py-10 gap-4",
                        this.props.className
                    )}
                >
                    {/* Disconnected icon */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                            <WifiOff className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                            <Bot className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="font-semibold text-base text-foreground">
                            AI Assistant Disconnected
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
                            Something went wrong loading the assistant. The rest
                            of the portfolio is still fully functional.
                        </p>
                    </div>

                    <button
                        onClick={this.handleRetry}
                        className={cn(
                            "inline-flex items-center gap-2",
                            "px-4 py-2.5 rounded-full text-sm font-medium",
                            "bg-primary text-primary-foreground",
                            "hover:bg-primary/90 active:scale-95",
                            "transition-all duration-150",
                            "shadow-sm shadow-primary/20"
                        )}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Retry Connection
                    </button>

                    {/* Error details (collapsed) */}
                    {this.state.error && (
                        <details className="mt-2 text-xs text-muted-foreground/60 max-w-[280px]">
                            <summary className="cursor-pointer hover:text-muted-foreground transition-colors">
                                Technical details
                            </summary>
                            <pre className="mt-1 text-left whitespace-pre-wrap break-all bg-muted/50 rounded-lg p-2">
                                {this.state.error.message}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
