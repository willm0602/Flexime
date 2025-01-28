import { useState } from "react";

export default function useLocalStorage<T>(localStorageKey: string, initValue?: T): [T, (newVal: T) => void] {
  const valFromLocalStorage = localStorage.getItem(localStorageKey);
  const parsedVal = JSON.parse(valFromLocalStorage || JSON.stringify(initValue)) as T;

  const [$val, $setVal] = useState<T>(parsedVal);
  const setVal = (newVal: T) => {
    $setVal(newVal);
    localStorage.setItem(localStorageKey, JSON.stringify(newVal));
  };

  return [$val, setVal];
}
