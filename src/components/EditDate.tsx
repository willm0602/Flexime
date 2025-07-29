import EditableInput from './EditableInput';

type EditDateProps = {
    defaultDate?: string;
    dispatch: (newVal: string) => void;
    label: string;
};

export default function EditDate(props: EditDateProps) {
    const { defaultDate, dispatch, label } = props;

    return (
        <EditableInput
            label={label}
            val={defaultDate || new Date().toDateString()}
            onSave={(newDate) => {
                dispatch(newDate);
            }}
            inputProps={{
                type: 'date',
                className: 'input'
            }}
        />
    );
}
