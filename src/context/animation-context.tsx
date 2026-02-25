"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AnimationContextType {
    animationsEnabled: boolean;
    setAnimationsEnabled: (enabled: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType>({
    animationsEnabled: true,
    setAnimationsEnabled: () => { },
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    const [animationsEnabled, setAnimationsEnabled] = useLocalStorage<boolean>(
        "portfolio-animations-enabled",
        true
    );

    // Respect prefers-reduced-motion on first visit (only if no stored pref)
    useEffect(() => {
        const stored = window.localStorage.getItem(
            "portfolio-animations-enabled"
        );
        if (stored === null) {
            const mediaQuery = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );
            if (mediaQuery.matches) {
                setAnimationsEnabled(false);
            }
        }
    }, [setAnimationsEnabled]);

    return (
        <AnimationContext.Provider
            value={{ animationsEnabled, setAnimationsEnabled }}
        >
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimations() {
    return useContext(AnimationContext);
}
