import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function replaceAtIndex<T>(arr: T[], index: number, newItem: T): T[] {
    return arr.map((item, i) => (i === index ? newItem : item));
}

export function removeAtIndex<T>(arr: T[], index: number): T[] {
    return arr.filter((_, i) => i !== index);
}

export function insertAtIndex<T>(arr: T[], index: number, item: T): T[] {
    return [...arr.slice(0, index), item, ...arr.slice(index)];
}
