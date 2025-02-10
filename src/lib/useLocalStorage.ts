'use client';

import { useEffect, useState } from "react";

/**
 * Safe method for parsing JSON
 */
function safeParse<T>(text: string, defaultVal: T): T {
    try {
        return JSON.parse(text) as T;
    } catch {
        return defaultVal;
    }
}

export default function useLocalStorage<T>(
    localStorageKey: string,
    defaultVal: T,
    onLoad?: (val: T) => void
): [T, (newVal: T) => void] {
    const [val, setVal] = useState<T>(() => {
        // Initialize state with value from localStorage or defaultVal
        if (typeof window !== "undefined") {
            const valFromLocalStorage = localStorage.getItem(localStorageKey);
            const parsedVal = valFromLocalStorage ? safeParse(valFromLocalStorage, defaultVal) : defaultVal;
            if (onLoad) {
                onLoad(parsedVal); // Call onLoad synchronously during initialization
            }
            return parsedVal;
        }
        return defaultVal;
    });

    useEffect(() => {
        // Update localStorage whenever val changes
        if (typeof window !== "undefined") {
            localStorage.setItem(localStorageKey, JSON.stringify(val));
        }
    }, [val, localStorageKey]);

    return [val, setVal];
}
