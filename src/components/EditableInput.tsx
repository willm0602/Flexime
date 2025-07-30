'use client';

import { useId, useRef, useState } from 'react';

interface EditableInputProps {
    label: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    val: string;
    onSave: (newVal: string) => unknown;
    onDelete?: CallableFunction;
}

export default function EditableInput({
    inputProps,
    label,
    val,
    onSave,
    onDelete,
}: EditableInputProps) {
    const [inViewMode, setinViewMode] = useState(true);
    const input = useRef<HTMLInputElement | null>(null);
    const id = useId();

    return (
        <div className='mr-8'>
            {inViewMode ? (
                <div className='flex flex-col justify-start items-start h-full'>
                    <span className='label text-xl font-bold'>{label}</span>
                    <span className='text-lg'>{val}</span>
                    <div className='flex flex-col flex-1 w-full'>
                        <div className='flex-1' />
                        <div className='flex'>
                            <button
                                type='button'
                                onClick={() => {
                                    setinViewMode(false);
                                }}
                                className='btn btn-info mt-2'
                            >
                                Edit
                            </button>
                            {onDelete && (
                                <button
                                    type='button'
                                    className='btn btn-error'
                                    onClick={() => {
                                        onDelete();
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <label htmlFor={id} className='label text-xl bold'>
                        {label}
                    </label>
                    <input
                        id={id}
                        {...inputProps}
                        ref={input}
                        defaultValue={val}
                    />
                    <div className='flex'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => {
                                onSave(input?.current?.value || '');
                                setinViewMode(true);
                            }}
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            className='btn btn-accent ml-4'
                            onClick={() => {
                                setinViewMode(true);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
