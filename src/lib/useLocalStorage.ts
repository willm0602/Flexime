import { useState } from "react";

export default function useLocalStorage<T>(
    localStorageKey: string,
    defaultVal: T
): [T, (newVal: T) => void]{
    const initValAsStr = localStorage.getItem(localStorageKey) || '';
    let initVal;
    try{
        initVal = JSON.parse(initValAsStr) as T;
    } catch {
        initVal = defaultVal;
    }
    const [val, dispatch] = useState<T>(initVal);
    const setVal = (newVal: T) => {
        dispatch(newVal);
        localStorage.setItem(localStorageKey, JSON.stringify(newVal));
    }

    return [val, setVal];
}