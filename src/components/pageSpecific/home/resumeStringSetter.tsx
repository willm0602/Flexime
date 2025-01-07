
export type ResumeStringSetterProps<P> = {
    parent: P,
    fieldName: keyof P & string,
    defaultVal: P[keyof P] & string,
    setParent: (parent: P) => void,
    label?: string
}

export default function ResumeStringSetter<P>(props: ResumeStringSetterProps<P>){
    const {parent, fieldName, defaultVal, setParent} = props;
    const label = props.label || fieldName;

    return <label className="form-control flex flex-col w-full max-w-xs mr-8">
        <div className="label">
            <span className="label-text capitalize mr-12">{label}</span>
        </div>
        <input type="text"
               defaultValue={defaultVal}
               className="input input-bordered" />
    </label>
}