"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { failResponse, genericResponse, successResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import { resetPassword } from "@/services/User";
export default function EmailInputForm() {
    const emailSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
    });

    type EmailSchema = z.infer<typeof emailSchema>;
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });
    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message,
        });
    };

    const onSubmit: SubmitHandler<EmailSchema> = async ({ email }) => {
        const response: genericResponse<{ message: string }> = await resetPassword(email);
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            setErrorRoot(failApiResponse.message);
        } else {
            const successApiResponse = response as successResponse<{ message: string }>;
            toast({
                title: "Reset Password",
                description: successApiResponse.data.message,
                duration: 5000,
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="px-1" htmlFor="Email">
                        Email
                    </label>
                    <input
                        id="Email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className="input-field"
                    />
                    {errors.email && (
                        <div className="m-1 text-sm text-red-700">{errors.email.message}</div>
                    )}
                </div>
                <button className="auth-buttons my-4 bg-blue-900 text-white" type="submit">
                    Reset password
                </button>
                {errors.root && (
                    <div className="mx-auto mt-4 text-sm text-red-700" data-testid="root-error">
                        {errors.root.message}
                    </div>
                )}
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
