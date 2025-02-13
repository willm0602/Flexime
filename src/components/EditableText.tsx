/**
 * Component used to edit a string field
*/

import { Dispatch, useState } from 'react'


/**
 * Properties for the text component
 *
 * @field defaultVal: String
 *      the value shown for the field
 * @field dispatch: Callable
 *      the method called when the string is updated
 * @field label: String
 *      the label for the input
 * @field remove: Callable
 *      the method called to remove the text if the field is optional
*/
type EditableTextProps = {
    defaultVal: string
    dispatch: (val: string) => void
    label: string
    remove?: CallableFunction
}

export default function EditableText(props: EditableTextProps) {
    const { defaultVal, dispatch, label, remove } = props

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
                    dispatchEdit={dispatchEdit}
                />
            ) : (
                <EditFieldDisplay
                    val={currVal}
                    remove={remove}
                    dispatchEdit={dispatchEdit}
                    label={label}
                />
            )}
        </>
    )
}

type EditFieldProps = {
    val: string
    setVal: Dispatch<string>
    dispatch: Dispatch<string>
    dispatchEdit: Dispatch<boolean>
    label: string
}

function EditField(props: EditFieldProps) {
    const { val, setVal, dispatch, dispatchEdit, label } = props

    const [currVal, setCurrVal] = useState(val)
    const saveField = () => {
        setVal(currVal)
        dispatch(currVal)
        dispatchEdit(false)
    }

    return (
        <div className="min-w-240 mr-8">
            <input
                defaultValue={currVal}
                className="input input-bordered input-sm"
                onChange={(e) => {
                    setCurrVal(e.target.value)
                }}
                placeholder={label}
            />
            <br />
            <button
                className="btn btn-main btn-sm btn-secondary mt-2"
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
    val: string
    dispatchEdit: Dispatch<boolean>
    remove?: CallableFunction
    label: string
}

function EditFieldDisplay(props: EditFieldDisplayProps) {
    const { val, dispatchEdit, remove, label } = props
    return (
        <div className='min-w-240 mr-8'>
            <label className="text-xs">{label}</label>
            <br />
            <label className="font-bold">{val}</label>
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
