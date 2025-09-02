import type React from 'react';
import { type JSX, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const DEFAULT_ADD_BTN_TEXT = 'Add';
const DEFAULT_WRAPPER_CLASS = 'w-full flex flex-col';
const DEFAULT_ITEM_CLASS =
    'flex flex-col border-solid border-slate-500 border-2 my-4 p-4 cursor-pointer';

export type ListItemProps<T> = {
    val: T;
    vals: T[];
    setList: (newVals: T[]) => void;
    setItem: (newVal: T) => void;
    idx: number;
    confirmThenRemove: () => boolean;
    removeItem: () => void;
};

export type ListItem<T> = (props: ListItemProps<T>) => JSX.Element;

type EditListProps<T> = {
    vals?: T[];
    setList: (newList: T[]) => void;
    RenderItem: ListItem<T>;
    NewItemFormBody: React.ReactElement;
    defaultItem: T;
    addBtnText?: string;
    containerClassName?: string;
    itemWrapperClass?: string;
};

export default function EditList<T>(props: EditListProps<T>) {
    const {
        setList,
        RenderItem,
        containerClassName,
        NewItemFormBody,
        defaultItem,
        addBtnText,
        itemWrapperClass,
    } = props;

    const vals = useMemo(() => props.vals || [], [props.vals]);

    const addNew = (item: T) => {
        setList([...vals, item]);
    };

    const confirmThenRemoveAtIdx = () => () => {
        // TODO: Add in confirm modal before removing values
        // const confirmPrompt = 'This will permanently remove this item from the resume, please confirm if you would like to remove this.'
        // const shouldUpdate = window.confirm(confirmPrompt);
        // if (!shouldUpdate)
        //   return false;
        // const updatedChildren = vals.filter((_, idx) => idx != idxToRemove);
        // setList(updatedChildren);
        return true;
    };
    return (
        <>
            <div className={twMerge(containerClassName, DEFAULT_WRAPPER_CLASS)}>
                {vals.map((val, idx) => {
                    const id =
                        typeof val === 'string' ? val : JSON.stringify(val);
                    return (
                        <div
                            className={twMerge(
                                DEFAULT_ITEM_CLASS,
                                itemWrapperClass,
                            )}
                            key={`edit-list-${idx}-${id}`}
                        >
                            <RenderItem
                                val={val}
                                vals={vals}
                                setItem={(updatedVal: T) => {
                                    const updatedList = [...vals];
                                    updatedList[idx] = updatedVal;
                                    setList(updatedList);
                                }}
                                setList={setList}
                                confirmThenRemove={confirmThenRemoveAtIdx()}
                                removeItem={() => {
                                    const updatedVals = vals;
                                    updatedVals.splice(idx, 1);
                                    setList(updatedVals);
                                }}
                                idx={idx}
                            />
                        </div>
                    );
                })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    if (typeof defaultItem === 'string') {
                        const text = data.text || defaultItem || '';
                        // @ts-ignore
                        addNew(text);
                        return;
                    }
                    const newItem = {
                        ...defaultItem,
                        ...data,
                    };
                    addNew(newItem);
                    form.reset();
                }}
            >
                {NewItemFormBody}
                <button className='btn btn-primary mt-8' type='submit'>
                    {addBtnText || DEFAULT_ADD_BTN_TEXT}
                </button>
            </form>
        </>
    );
}
