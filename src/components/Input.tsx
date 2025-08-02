export default function Input(
    props: { label: string } & React.InputHTMLAttributes<HTMLInputElement>,
) {
    const { label } = props;
    return (
        <fieldset className='fieldset'>
            <legend className='fieldset-legend'>{label}</legend>
            <input className='input' placeholder={label} {...props} />
        </fieldset>
    );
}
