import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
    className?: string
}

export default function LoadingSpinner({className}: LoadingSpinnerProps) {
    const defaultClassName = 'loading loading-spinner w-1/4 mx-auto';

    return <span className={twMerge(className, defaultClassName)} />
}