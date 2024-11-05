"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import InputField from "./InputField";

import { useOTPContext } from "@/store/OTPContext";
export default function EmailInputForm() {
    const { setOTPContext } = useOTPContext();
    const emailSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
    });

    type EmailSchema = z.infer<typeof emailSchema>;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
        // here comes the link we sent to backend.

        setOTPContext("resetPassword", data.email);
        router.push("/verification");
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <InputField
                        id="Email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <div className="m-1 text-sm text-red-700">{errors.email.message}</div>
                    )}
                </div>
                <button className="auth-buttons my-4 bg-blue-950 text-white" type="submit">
                    Reset password
                </button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2">
                <span className="block w-4 text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="currentColor">
                        <path
                            d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                            data-name="Left"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        />
                    </svg>
                </span>
                <a
                    className="flex cursor-pointer justify-center font-semibold text-blue-900"
                    href="/login"
                >
                    Back to log in
                </a>
            </div>
        </>
    );
}
