"use client";

import React, { createContext, useContext } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export type LayoutDensity = "compact" | "comfortable";

interface LayoutDensityContextType {
    density: LayoutDensity;
    setDensity: (density: LayoutDensity) => void;
}

const LayoutDensityContext = createContext<LayoutDensityContextType>({
    density: "comfortable",
    setDensity: () => { },
});

export function LayoutDensityProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [density, setDensity] = useLocalStorage<LayoutDensity>(
        "portfolio-layout-density",
        "comfortable"
    );

    return (
        <LayoutDensityContext.Provider value={{ density, setDensity }}>
            {children}
        </LayoutDensityContext.Provider>
    );
}

export function useLayoutDensity() {
    return useContext(LayoutDensityContext);
}
