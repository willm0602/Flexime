import { type Dispatch, useState } from 'react';
import EditableInput from './EditableInput';

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
    const { defaultVal, dispatch, label, minVal, maxVal, step } = props;
    const digits = props.digits || 0;

    return (
        <EditableInput
            label={label}
            val={defaultVal.toPrecision(digits)}
            onSave={(unparsed) => {
                dispatch(Number.parseFloat(unparsed));
            }}
            inputProps={{
                min: minVal,
                max: maxVal,
                step,
                className: 'input validator',
                type: 'number',
            }}
        />
    );
}
