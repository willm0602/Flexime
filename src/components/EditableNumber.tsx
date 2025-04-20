import { type Dispatch, useState } from 'react';

type EditableNumberProps = {
    defaultVal: number;
    dispatch: Dispatch<number>;
    label: string;
    remove?: CallableFunction;
    minVal?: number;
    maxVal?: number;
    step?: number;
    digits?: number;
};

export default function EditableNumber(props: EditableNumberProps) {
    const { defaultVal, dispatch, label, remove, minVal, maxVal, step } = props;
    const digits = props.digits || 0;

    const [isInEditMode, dispatchEdit] = useState<boolean>(false);
    const [currVal, setVal] = useState(defaultVal);

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
    );
}

type EditFieldProps = {
    val: number;
    setVal: Dispatch<number>;
    dispatch: Dispatch<number>;
    dispatchEdit: Dispatch<boolean>;
    label: string;
    minVal?: number;
    maxVal?: number;
    step?: number;
};

function EditField(props: EditFieldProps) {
    const { val, setVal, dispatch, dispatchEdit, label, minVal, maxVal } =
        props;

    const step = props.step || 1;

    const [currVal, setCurrVal] = useState(val);
    const saveField = () => {
        setVal(currVal);
        dispatch(currVal);
        dispatchEdit(false);
    };

    return (
        <div className='min-w-fit'>
            <h4 className='label text-xs pl-0 font-bold'>{label}</h4>
            <input
                defaultValue={currVal}
                className='input input-bordered input-sm max-w-24'
                type='number'
                step={step}
                onChange={(e) => {
                    const newVal = Number.parseFloat(e.target.value);
                    if (
                        (minVal === undefined || newVal > minVal) &&
                        (maxVal === undefined || newVal < maxVal)
                    ) {
                        setCurrVal(Number.parseFloat(e.target.value));
                    }
                }}
                min={minVal}
                max={maxVal}
                placeholder={label}
            />
            <button
                className='btn btn-main btn-sm btn-secondary ml-4'
                onClick={saveField}
                type='button'
            >
                Save
            </button>
            <button
                type='button'
                className='btn btn-main btn-sm btn-warning ml-4'
                onClick={() => {
                    dispatchEdit(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}

type EditFieldDisplayProps = {
    val: number;
    dispatchEdit: Dispatch<boolean>;
    remove?: CallableFunction;
    digits: number;
    label: string;
};

function EditFieldDisplay(props: EditFieldDisplayProps) {
    const { val, dispatchEdit, remove, digits, label } = props;
    return (
        <div className='max-h-fit'>
            <h4 className='label text-xs pl-0 font-bold mb-0'>{label}</h4>
            <span className='font-bold'>{val.toPrecision(digits)}</span>
            <br />
            <button
                className='btn btn-info btn-xs'
                onClick={() => {
                    dispatchEdit(true);
                }}
                type='button'
            >
                Edit
            </button>
            {remove && (
                <button
                    type='button'
                    onClick={() => remove()}
                    className='btn btn-error btn-xs ml-4'
                >
                    Remove
                </button>
            )}
        </div>
    );
}
