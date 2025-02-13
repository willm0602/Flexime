/**
 * Reusable component to edit values inside a list
 */

import { JSX } from 'react'
import { twMerge } from 'tailwind-merge'

const DEFAULT_ADD_BTN_TEXT = 'Add'
const DEFAULT_WRAPPER_CLASS = 'w-full flex flex-col'
const DEFAULT_ITEM_CLASS =
    'flex flex-col border-solid border-slate-500 border-2 my-4 p-4'

/**
 * Properties for an individual item inside an editable list
 * @field val: T
 *      the value used for this specific item inside the list
 * @field vals: T[]
 *      all of the values inside the list
 * @field setList: Callable
 *      method used to update all of the values inside of the list
 * @field setItem: Callable
 *      method used to overwrite this specific item inside the list
 * @field idx: number
 *      the index of the item inside the list
 * @field confirmThenRemove: Callable
 *      method to allow the user to confirm they wish to remove the item from a
 *      list before removing it
 * @field removeItem: Callable
 *      method to remove an item from a list
*/
export type ListItemProps<T> = {
    val: T
    vals: T[]
    setList: (newVals: T[]) => void
    setItem: (newVal: T) => void
    idx: number
    confirmThenRemove: () => boolean
    removeItem: () => void
}

export type ListItem<T> = (props: ListItemProps<T>) => JSX.Element

/**
 * Properties for a list containing items that can be modified
 *
 * @field setList: Callable
 *      method used to update the entire list
 * @field RenderItem: Functional Component
 *      A React component made using the properties from ListItem to generate
 *      the component for each item.
 * @field defaultChild: T
 *      a default instance of the list item to be used when adding items to the
 *      list
 * @field addBtnText: String | undefined
 *      text to use on the button for adding a new item to the list.
 * @field containerClassName: String | undefined
 *      an optional class to provide to apply to the wrapper for the list
 * @field itemWrapperClass: String | undefined
 *      optional class to provide to each individual item in the list
*/
type EditListProps<T> = {
    vals?: T[]
    setList: (newList: T[]) => void
    RenderItem: ListItem<T>
    defaultChild: T
    addBtnText?: string
    containerClassName?: string
    itemWrapperClass?: string
}

export default function EditList<T>(props: EditListProps<T>) {
    const {
        setList,
        RenderItem,
        containerClassName,
        defaultChild,
        addBtnText,
        itemWrapperClass,
    } = props
    const vals = props.vals || []

    const addNew = () => {
        setList([...vals, defaultChild])
    }

    const confirmThenRemoveAtIdx = (idx: number) => () => {
        console.log(idx)
        // TODO: Add in confirm modal before removing values
        // const confirmPrompt = 'This will permanently remove this item from the resume, please confirm if you would like to remove this.'
        // const shouldUpdate = window.confirm(confirmPrompt);
        // if (!shouldUpdate)
        //   return false;
        // const updatedChildren = vals.filter((_, idx) => idx != idxToRemove);
        // setList(updatedChildren);
        return true
    }
    return (
        <div className={twMerge(containerClassName, DEFAULT_WRAPPER_CLASS)}>
            {vals.map((val, idx) => {
                return (
                    <div
                        className={twMerge(
                            DEFAULT_ITEM_CLASS,
                            itemWrapperClass
                        )}
                        key={`edit-list-${idx}`}
                    >
                        <RenderItem
                            val={val}
                            vals={vals}
                            setItem={(updatedVal: T) => {
                                const updatedList = [...vals]
                                updatedList[idx] = updatedVal
                                setList(updatedList)
                            }}
                            setList={setList}
                            confirmThenRemove={confirmThenRemoveAtIdx(idx)}
                            removeItem={() => {
                                const updatedVals = vals
                                updatedVals.splice(idx, 1)
                                setList(updatedVals)
                            }}
                            idx={idx}
                        />
                    </div>
                )
            })}
            <button onClick={addNew} className="btn btn-primary">
                {addBtnText || DEFAULT_ADD_BTN_TEXT}
            </button>
        </div>
    )
}
