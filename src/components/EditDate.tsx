/**
 * Component that allows for editing a date widget
 *
 * NOTE: this assumes that the date is given as a string in YYYY-MM-DD format,
 * rather than datetime format
*/


/**
 * Props to be provided to an EditDate component
 *
 * @field defaultDate: String | undefined
 *      the value used for the date
 * @field dispatch: Callable
 *      method to be called when the date is updated
 * @field label: String
 *      the label used to identify the date field
*/
type EditDateProps = {
    defaultDate?: string
    dispatch: (newVal: string) => void
    label: string
}

export default function EditDate(props: EditDateProps) {
    const { defaultDate, dispatch, label } = props

    return (
        <div className="block">
            <label className="text-xs">{label}</label>
            <br />
            <input
                className="input input-sm input-bordered"
                type="date"
                defaultValue={defaultDate}
                onChange={(e) => {
                    const newDate = e.target.value
                    dispatch(newDate)
                }}
            />
        </div>
    )
}
