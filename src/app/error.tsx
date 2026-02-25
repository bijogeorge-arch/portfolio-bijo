"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Next.js App Router route-level error boundary.
 *
 * Catches unhandled errors at the page level and displays a
 * premium fallback UI with retry and home navigation options.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to an external error reporting service in production
        console.error("[GlobalError]", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-6">
            <div className="flex flex-col items-center text-center max-w-md gap-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-destructive" />
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">
                        Something went wrong
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        An unexpected error occurred while loading this page.
                        You can try again or navigate back to the home page.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-muted text-foreground hover:bg-muted/80 active:scale-95 transition-all duration-150"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>

                {/* Error digest for debugging */}
                {error.digest && (
                    <p className="text-xs text-muted-foreground/50 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
