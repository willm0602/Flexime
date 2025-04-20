import { type Dispatch, useState } from 'react';

type EditableTextProps = {
    defaultVal: string;
    dispatch: (val: string) => void;
    label: string;
    remove?: CallableFunction;
    className?: string;
};

export default function EditableText(props: EditableTextProps) {
    const { defaultVal, dispatch, label, remove, className } = props;

    const [isInEditMode, dispatchEdit] = useState<boolean>(false);
    const [currVal, setVal] = useState(defaultVal);

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
    );
}

type EditFieldProps = {
    val: string;
    setVal: Dispatch<string>;
    dispatch: Dispatch<string>;
    dispatchEdit: Dispatch<boolean>;
    label: string;
};

function EditField(props: EditFieldProps) {
    const { val, setVal, dispatch, dispatchEdit, label } = props;

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
                className='input input-bordered input-sm'
                onChange={(e) => {
                    setCurrVal(e.target.value);
                }}
                placeholder={label}
            />
            <br />
            <button
                className='btn btn-main btn-sm btn-secondary mt-2'
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
    val: string;
    dispatchEdit: Dispatch<boolean>;
    remove?: CallableFunction;
    label: string;
};

function EditFieldDisplay(props: EditFieldDisplayProps) {
    const { val, dispatchEdit, remove, label } = props;
    return (
        <div className='max-h-fit'>
            <h4 className='label text-xs pl-0 font-bold mb-0'>{label}</h4>
            <span className='font-bold'>{val}</span>
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
