"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that syncs React state with localStorage.
 *
 * - SSR-safe: reads from localStorage only after hydration.
 * - Listens for cross-tab `storage` events so multiple windows stay in sync.
 * - Provides a stable `setValue` that mirrors the `useState` API.
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
    // Read from localStorage only on the client
    const readValue = useCallback((): T => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [key, initialValue]);

    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Hydrate from localStorage after mount
    useEffect(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                setStoredValue((prev) => {
                    const nextValue =
                        value instanceof Function ? value(prev) : value;
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem(
                            key,
                            JSON.stringify(nextValue)
                        );
                    }
                    return nextValue;
                });
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key]
    );

    // Keep in sync across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue) as T);
                } catch {
                    // ignore parse errors from other code
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [storedValue, setValue];
}
