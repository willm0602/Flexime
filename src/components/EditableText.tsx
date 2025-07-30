import EditableInput from './EditableInput';
import { twMerge } from 'tailwind-merge';

type EditableTextProps = {
    defaultVal: string;
    dispatch: (val: string) => void;
    label: string;
    remove?: CallableFunction;
    className?: string;
};

export default function EditableText(props: EditableTextProps) {
    const { defaultVal, dispatch, label, remove, className } = props;
    return (
        <EditableInput
            label={label}
            val={defaultVal}
            onSave={dispatch}
            onDelete={remove}
            inputProps={{
                className: twMerge(className, 'input mb-4'),
            }}
        />
    );
}
