type EditDateProps = {
    defaultDate?: string;
    dispatch: (newVal: string) => void;
    label: string;
};

export default function EditDate(props: EditDateProps) {
    const { defaultDate, dispatch, label } = props;

    return (
        <div className='block'>
            <label className='text-xs' htmlFor="edit-date">{label}</label>
            <br />
            <input
                id='edit-date' // TODO: generalize
                className='input input-sm input-bordered'
                type='date'
                defaultValue={defaultDate}
                onChange={(e) => {
                    const newDate = e.target.value;
                    dispatch(newDate);
                }}
            />
        </div>
    );
}
