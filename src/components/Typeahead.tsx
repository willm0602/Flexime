import { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const MIN_QUERY_LEN = 3;
const MAX_SHOWN_ENTRIES = 10;

interface TypeaheadProps<T> {
    vals: T[];
    getDisplay: (val: T) => string;
    onSelect: (val: T) => undefined | unknown;
    selectedVal: T | undefined;
    wrapperClassName?: string;
    listItemClassName?: string;
    listClassName?: string;
    buttonClassName?: string;
    inputClassName?: string;
    placeholder?: string;
}

export default function Typeahead<T>({
    vals,
    getDisplay,
    onSelect,
    selectedVal,
    wrapperClassName,
    listItemClassName,
    listClassName,
    inputClassName,
    buttonClassName,
    placeholder,
}: TypeaheadProps<T>) {
    type AnnotatedVal = T & {
        label: string;
    };

    const annotatedVals = useMemo(
        () =>
            vals.map((val: T) => ({
                ...val,
                label: getDisplay(val),
            })),
        [vals, getDisplay],
    );

    const [searchQuery, setSearchQuery] = useState(
        selectedVal ? getDisplay(selectedVal) : '',
    );
    const [shownVals, setShownVals] = useState<AnnotatedVal[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    useEffect(() => {
        if (!(searchQuery && searchQuery.length >= MIN_QUERY_LEN)) {
            setShownVals([]);
            return;
        }
        const shownVals = annotatedVals
            .filter((annotatedVal) => {
                return annotatedVal.label.includes(searchQuery);
            })
            .slice(0, MAX_SHOWN_ENTRIES);
        setShownVals(shownVals);
    }, [searchQuery, annotatedVals]);

    return (
        <div className={twMerge('relative', wrapperClassName)}>
            <input
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                    setShowOptions(true);
                }}
                value={searchQuery}
                placeholder={placeholder}
                className={twMerge('input input-bordered', inputClassName)}
            />
            {showOptions && (
                <ul
                    className={twMerge(
                        'list-none absolute bg-base-200 mt-0 pl-0',
                        listClassName,
                    )}
                >
                    {shownVals.map((val, idx) => {
                        return (
                            <li
                                key={`typeahead-item-${idx}`}
                                className={twMerge(
                                    'focus-within:border-solid px-4 focus-within:border-2 focus-within:border-white',
                                    listItemClassName,
                                )}
                            >
                                <button
                                    className={twMerge(
                                        'focus:outline-none',
                                        buttonClassName,
                                    )}
                                    onClick={() => {
                                        onSelect(val);
                                        setSearchQuery(val.label);
                                        setShowOptions(false);
                                    }}
                                >
                                    {val.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
