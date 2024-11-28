/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}
function InputField({ id, type, placeholder, ...rest }: InputFieldProps) {
    return (
        <div>
            <label className="label">{id}</label>
            <input type={type} placeholder={placeholder} className="input-field" {...rest} />
        </div>
    );
}
export default InputField;
