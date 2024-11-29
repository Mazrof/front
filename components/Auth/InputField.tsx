/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}
function InputField({
    id,
    type,
    register,
    error,
}: {
    id: string;
    type: string;
    register: any;
    error?: string | boolean;
}) {
    const [input, setInput] = useState("");
    return (
        <div className="relative w-full max-w-sm">
            <label className="relative">
                <input
                    type={type}
                    className={`h-14 w-full rounded-lg border-2 border-gray-200 px-6 text-1.5xl text-gray-600 outline-none transition duration-200 focus:border-blue-500 ${error && "error-input"}`}
                    {...register(id)}
                    onChange={(e) => setInput(e.target.value)}
                />
                <span
                    className={`input text-1.5sxl absolute bottom-0 left-0 mx-4 px-2 text-gray-500 transition duration-200 ${
                        input.trim() ? "active" : ""
                    } ${error && "error"}`}
                >
                    {id}
                </span>
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
export default InputField;
