'use client';

import { useId, useRef, useState } from 'react';

interface EditableInputProps {
    textAreaProps?: React.InputHTMLAttributes<HTMLTextAreaElement>;
    val: string;
    onSave: (newVal: string) => unknown;
    onDelete?: CallableFunction;
}

export default function EditableTextArea<T>({
    textAreaProps,
    val,
    onSave,
    onDelete,
}: EditableInputProps) {
    const [inViewMode, setinViewMode] = useState(true);
    const input = useRef<HTMLTextAreaElement | null>(null);
    const id = useId();
    return (
        <div>
            {inViewMode ? (
                <div className='flex flex-col justify-start items-start h-full'>
                    <span className='text-lg'>{val}</span>
                    <div className='flex flex-col flex-1 w-full'>
                        <div className='flex-1' />
                        <div className='flex'>
                            <button
                                type='button'
                                onClick={() => {
                                    setinViewMode(false);
                                }}
                                className='btn btn-info btn-md'
                            >
                                Edit
                            </button>
                            {onDelete && (
                                <button
                                    type='button'
                                    className='btn btn-error btn-md ml-4'
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
                    <textarea
                        id={id}
                        {...textAreaProps}
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
