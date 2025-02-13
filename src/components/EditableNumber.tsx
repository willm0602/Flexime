/**
 * Component used to update a numeric field
*/

import { Dispatch, useState } from 'react'

/**
 * Properties for the component used to edit the numeric value
 * @field defaultVal: Number
 *      the value of the field
 * @field dispatch: Callable
 *      the method to be used when updating the value
 * @field label: String
 *      the label for the field
 * @field remove: Callable
 *      the method that can be called to remove the number
 *      if it is optional
 * @field minVal: Number | Optional
 *      a minimum value for the field
 * @field maxVal: Number | Optional
 *      a maximum value for the field
 * @field step: Number | Optional
 *      the gap for values
 * @field digits: Number
 *      the number of digits to be included for the number
*/
type EditableNumberProps = {
    defaultVal: number
    dispatch: Dispatch<number>
    label: string
    remove?: CallableFunction
    minVal?: number
    maxVal?: number
    step?: number
    digits?: number
}

export default function EditableNumber(props: EditableNumberProps) {
    const { defaultVal, dispatch, label, remove, minVal, maxVal, step } = props
    const digits = props.digits || 0

    const [isInEditMode, dispatchEdit] = useState<boolean>(false)
    const [currVal, setVal] = useState(defaultVal)

    return (
        <>
            {isInEditMode ? (
                <EditField
                    val={currVal}
                    setVal={setVal}
                    dispatch={dispatch}
                    label={label}
                    minVal={minVal}
                    maxVal={maxVal}
                    step={step}
                    dispatchEdit={dispatchEdit}
                />
            ) : (
                <EditFieldDisplay
                    val={currVal}
                    remove={remove}
                    digits={digits}
                    dispatchEdit={dispatchEdit}
                    label={label}
                />
            )}
        </>
    )
}

/**
 * Properties to use for the component when it is in "edit" mode
*/
type EditFieldProps = {
    val: number
    setVal: Dispatch<number>
    dispatch: Dispatch<number>
    dispatchEdit: Dispatch<boolean>
    label: string
    minVal?: number
    maxVal?: number
    step?: number
}

function EditField(props: EditFieldProps) {
    const { val, setVal, dispatch, dispatchEdit, label, minVal, maxVal } = props

    const step = props.step || 1

    const [currVal, setCurrVal] = useState(val)
    const saveField = () => {
        setVal(currVal)
        dispatch(currVal)
        dispatchEdit(false)
    }

    return (
        <div className="min-w-fit">
            <input
                defaultValue={currVal}
                className="input input-bordered input-sm max-w-24"
                type="number"
                step={step}
                onChange={(e) => {
                    const newVal = parseFloat(e.target.value)
                    if (
                        (minVal === undefined || newVal > minVal) &&
                        (maxVal === undefined || newVal < maxVal)
                    ) {
                        setCurrVal(parseFloat(e.target.value))
                    }
                }}
                min={minVal}
                max={maxVal}
                placeholder={label}
            />
            <button
                className="btn btn-main btn-sm btn-secondary ml-4"
                onClick={saveField}
            >
                Save
            </button>
            <button
                className="btn btn-main btn-sm btn-warning ml-4"
                onClick={() => {
                    dispatchEdit(false)
                }}
            >
                Cancel
            </button>
        </div>
    )
}

type EditFieldDisplayProps = {
    val: number
    dispatchEdit: Dispatch<boolean>
    remove?: CallableFunction
    digits: number
    label: string
}

function EditFieldDisplay(props: EditFieldDisplayProps) {
    const { val, dispatchEdit, remove, digits, label } = props
    return (
        <div>
            <label className="text-xs">{label}</label>
            <br />
            <label className="font-bold">{val.toPrecision(digits)}</label>
            <br />
            <button
                className="btn btn-info btn-xs"
                onClick={() => {
                    dispatchEdit(true)
                }}
            >
                Edit
            </button>
            {remove && (
                <button
                    onClick={() => remove()}
                    className="btn btn-error btn-xs ml-4"
                >
                    Remove
                </button>
            )}
        </div>
    )
}
