interface InputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder: string;
    required?: boolean;
}

export default function Input({
    id,
    name,
    type,
    label,
    placeholder,
}: Readonly<InputProps>) {
    return (
        <fieldset className="fieldset mb-4">
            <legend className="fieldset-legend">{label}</legend>
            <input type={type} className="input w-full" placeholder={placeholder} id={id} name={name} required />
        </fieldset>
    );
}