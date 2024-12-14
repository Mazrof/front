/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}
function InputField({
    id,
    type,
    register,
    testid,
    error,
    dataTest,
}: {
    id: string;
    type: string;
    register: any;
    testid: any;
    error?: string | boolean;
    dataTest?: string;
}) {
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="relative w-full max-w-sm">
            <label className="relative">
                <input
                    id={id}
                    type={showPassword ? "text" : type}
                    data-testid={testid}
                    className={`h-14 w-full rounded-lg border-2 border-gray-200 px-6 text-1.5xl text-gray-600 outline-none transition duration-200 focus:border-blue-500 ${error ? "error-input" : ""}${type === "password" ? "no-eye" : ""}`}
                    {...register(id)}
                    onChange={(e) => setInput(e.target.value)}
                    data-test={dataTest}
                    autoComplete="off"
                />
                <span
                    className={`input text-1.5sxl absolute bottom-0 left-0 mx-4 px-2 text-gray-500 transition duration-200 ${
                        input.trim() ? "active" : ""
                    } ${error ? "error" : ""}`}
                >
                    {`${id[0].toLocaleUpperCase() + id.slice(1)}`}
                </span>
                {id === "password" || id === "repeatPassword" ? (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-button"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                ) : (
                    ""
                )}
            </label>
            {error && (
                <p className="mt-1 text-xs text-red-500" data-test={`${dataTest}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}
export default InputField;
