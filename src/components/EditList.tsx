import { type JSX, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ReactSortable } from 'react-sortablejs';

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
    defaultChild: T;
    addBtnText?: string;
    containerClassName?: string;
    itemWrapperClass?: string;
};

function getAnnotatedItems<T>(vals: T[]) {
    const annotatedItems = vals.map((val, idx) => {
        return {
            data: val,
            id: `edit-list-${idx}-${JSON.stringify(val)}`,
        };
    });
    return annotatedItems;
}

export default function EditList<T>(props: EditListProps<T>) {
    const {
        setList,
        RenderItem,
        containerClassName,
        defaultChild,
        addBtnText,
        itemWrapperClass,
    } = props;

    const vals = useMemo(() => props.vals || [], [props.vals]);

    type AnnotatedItem = {
        data: T;
        id: string;
    };

    const [annotatedItems, dispatchAnnotatedItems] = useState<AnnotatedItem[]>(
        getAnnotatedItems(vals),
    );

    useEffect(() => {
        dispatchAnnotatedItems(getAnnotatedItems(vals));
    }, [vals]);

    const addNew = () => {
        setList([...vals, defaultChild]);
    };

    const setAnnotatedItems = (annotatedItems: AnnotatedItem[]) => {
        const newList: T[] = annotatedItems.map((annotated) => annotated.data);
        setList(newList);
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
        <ReactSortable
            className={twMerge(containerClassName, DEFAULT_WRAPPER_CLASS)}
            list={annotatedItems}
            setList={setAnnotatedItems}
        >
            {vals.map((val, idx) => {
                return (
                    <div
                        className={twMerge(
                            DEFAULT_ITEM_CLASS,
                            itemWrapperClass,
                        )}
                        key={`edit-list-${idx}-${JSON.stringify(val)}`}
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
            <button
                onClick={addNew}
                className='btn btn-primary mt-8'
                type='button'
            >
                {addBtnText || DEFAULT_ADD_BTN_TEXT}
            </button>
        </ReactSortable>
    );
}
