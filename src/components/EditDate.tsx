{/* <div className="flex-col flex">
    <label>Start Date</label>
    <input
        className="input input-sm"
        type="date"
        defaultValue={parseDate(job.startDate)}
        onChange={(e) => {
            const newDate = e.target.value;
            setItem({
                ...job,
                startDate: newDate
            });
        }}
    />
</div> */}

type EditDateProps = {
    defaultDate?: string,
    dispatch: (newVal: string) => void,
    label: string
}

export default function EditDate(props: EditDateProps){
    const {defaultDate, dispatch, label} = props;

    return <div className="block"><label>{label}</label><br/>
    <input
        className="input input-sm input-bordered"
        type="date"
        defaultValue={defaultDate}
        onChange={(e) => {
            const newDate = e.target.value;
            dispatch(newDate);
        }}
    /></div>
}