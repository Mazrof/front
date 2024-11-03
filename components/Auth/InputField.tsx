import { type, placeholder, label } from "../../types/auth";
function InputField({
    type,
    placeholder,
    label,
}: {
    type: type;
    placeholder: placeholder;
    label: label;
}) {
    return (
        <div>
            <label className="label">{label}</label>
            <input type={type} placeholder={placeholder} className="input-field" />
        </div>
    );
}
export default InputField;
