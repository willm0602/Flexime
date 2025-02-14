import { Dispatch, useState } from 'react'

type EditableTextProps = {
    defaultVal: string
    dispatch: (val: string) => void
    label: string
    remove?: CallableFunction
    className?: string
}

export default function EditableText(props: EditableTextProps) {
    const { defaultVal, dispatch, label, remove, className } = props

    const [isInEditMode, dispatchEdit] = useState<boolean>(false)
    const [currVal, setVal] = useState(defaultVal)

    return (
        <div className={className}>
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
        </div>
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
        <div className="min-w-fit">
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
        <div>
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
